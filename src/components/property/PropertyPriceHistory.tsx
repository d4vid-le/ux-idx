'use client';

import { useState, useEffect } from 'react';
import { formatPrice, formatDate } from '@/lib/utils';
import { TrendingUp, TrendingDown, DollarSign, Calendar, Info, ArrowRight, BarChart3 } from 'lucide-react';

interface PriceHistoryItem {
  date: string;
  price: number;
  event: 'Listed' | 'Price Change' | 'Sold' | 'Pending';
  changePercent?: number; // Only for price changes
}

interface PropertyPriceHistoryProps {
  propertyId: string;
  currentPrice: number;
  historyItems?: PriceHistoryItem[];
  estimatedValue?: number;
  neighborhoodMedianPrice?: number;
  yearBuilt?: number;
  className?: string;
}

export default function PropertyPriceHistory({
  propertyId,
  currentPrice,
  historyItems = [],
  estimatedValue,
  neighborhoodMedianPrice,
  yearBuilt,
  className = ''
}: PropertyPriceHistoryProps) {
  const [activeTab, setActiveTab] = useState<'history' | 'market'>('history');
  const [isChartVisible, setIsChartVisible] = useState(false);
  
  // Calculate market statistics
  const pricePerSqft = 1250; // Hardcoded for demo - would come from data
  const neighborhoodAvgPricePerSqft = 1175; // Hardcoded for demo - would come from data
  const annualAppreciation = 4.2; // Hardcoded for demo - would come from data
  
  const priceComparisonToEstimate = estimatedValue ? Math.round((currentPrice / estimatedValue - 1) * 100) : 0;
  const priceComparisonToMedian = neighborhoodMedianPrice ? Math.round((currentPrice / neighborhoodMedianPrice - 1) * 100) : 0;
  
  // For demonstration purposes
  const defaultHistory: PriceHistoryItem[] = [
    { date: '2023-08-15', price: currentPrice, event: 'Listed' },
    { date: '2023-07-20', price: currentPrice + 50000, event: 'Price Change', changePercent: -2.5 },
    { date: '2023-06-01', price: currentPrice + 125000, event: 'Price Change', changePercent: -5 },
    { date: '2023-05-01', price: currentPrice + 250000, event: 'Listed' }
  ];
  
  const historyData = historyItems.length > 0 ? historyItems : defaultHistory;

  // Track analytics when tabs are switched
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && 'dataLayer' in window) {
        (window as any).dataLayer.push({
          event: 'price_history_tab_view',
          property_id: propertyId,
          tab_name: activeTab
        });
      }
    } catch (error) {
      console.error('Analytics event failed', error);
    }
  }, [activeTab, propertyId]);
  
  // Prepare price chart data - simple DOM-based visualization
  const maxPrice = Math.max(...historyData.map(item => item.price));
  const minPrice = Math.min(...historyData.map(item => item.price));
  const range = maxPrice - minPrice;
  
  const getBarHeight = (price: number) => {
    const percentage = ((price - minPrice) / range) * 100;
    return Math.max(percentage, 10); // minimum 10% height for visibility
  };
  
  const handleViewChart = () => {
    setIsChartVisible(true);
    
    try {
      if (typeof window !== 'undefined' && 'dataLayer' in window) {
        (window as any).dataLayer.push({
          event: 'price_chart_view',
          property_id: propertyId
        });
      }
    } catch (error) {
      console.error('Analytics event failed', error);
    }
  };
  
  return (
    <div className={`mb-8 animate-fade-in ${className}`}>
      <h2 className="text-xl font-bold mb-4 flex items-center">
        <DollarSign className="mr-2 text-blue-600" size={20} />
        Property History & Market Data
      </h2>
      
      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-4">
        <button
          onClick={() => setActiveTab('history')}
          className={`py-2 px-4 font-medium text-sm border-b-2 mr-4 transition-colors ${
            activeTab === 'history'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
          aria-selected={activeTab === 'history'}
          role="tab"
        >
          Price History
        </button>
        <button
          onClick={() => setActiveTab('market')}
          className={`py-2 px-4 font-medium text-sm border-b-2 transition-colors ${
            activeTab === 'market'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
          aria-selected={activeTab === 'market'}
          role="tab"
        >
          Market Trends
        </button>
      </div>
      
      {/* Price History Tab */}
      {activeTab === 'history' && (
        <div className="bg-gray-50 rounded-lg p-4 md:p-6 animate-fade-in">
          {!isChartVisible && (
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-gray-700">Price History</h3>
              <button 
                onClick={handleViewChart}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center button-interactive"
              >
                <BarChart3 size={16} className="mr-1" />
                View Price Chart
              </button>
            </div>
          )}
          
          {isChartVisible && (
            <div className="mb-6 bg-white p-4 rounded-lg shadow-sm animate-fade-in">
              <h3 className="font-semibold text-gray-700 mb-3">Price Trend</h3>
              <div className="h-44 relative flex items-end space-x-1 border-b border-gray-200 pb-4 mb-2">
                {historyData.map((item, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div 
                      className={`w-full max-w-[30px] rounded-t ${
                        item.event === 'Listed' 
                          ? 'bg-blue-500' 
                          : item.event === 'Price Change' 
                            ? 'bg-amber-500' 
                            : item.event === 'Sold' 
                              ? 'bg-green-500' 
                              : 'bg-gray-500'
                      } transition-all duration-500 animate-grow-up`} 
                      style={{ 
                        height: `${getBarHeight(item.price)}%`,
                        animationDelay: `${index * 150}ms` 
                      }}
                      title={`${formatPrice(item.price)} - ${formatDate(item.date)}`}
                    ></div>
                    <div className="text-xs text-gray-500 mt-1 whitespace-nowrap overflow-hidden text-ellipsis max-w-[60px] text-center">
                      {formatDate(item.date, 'MMM dd')}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <div>Min: {formatPrice(minPrice)}</div>
                <div>Max: {formatPrice(maxPrice)}</div>
              </div>
            </div>
          )}
          
          <div className="overflow-x-auto rounded-lg">
            <table className="min-w-full divide-y divide-gray-200 bg-white">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event</th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Change</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {historyData.map((item, index) => (
                  <tr 
                    key={index} 
                    className={`hover:bg-blue-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                  >
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                      {formatDate(item.date)}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        item.event === 'Listed' 
                          ? 'bg-blue-100 text-blue-800' 
                          : item.event === 'Price Change' 
                            ? 'bg-amber-100 text-amber-800' 
                            : item.event === 'Sold' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-gray-100 text-gray-800'
                      }`}>
                        {item.event}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                      {formatPrice(item.price)}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      {item.changePercent ? (
                        <span className={`${item.changePercent < 0 ? 'text-red-600' : 'text-green-600'} flex items-center`}>
                          {item.changePercent < 0 ? (
                            <TrendingDown size={16} className="mr-1" />
                          ) : (
                            <TrendingUp size={16} className="mr-1" />
                          )}
                          {item.changePercent > 0 ? '+' : ''}{item.changePercent}%
                        </span>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="text-sm text-gray-500 mt-4">
            <div className="flex items-start mb-2">
              <Info size={16} className="text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
              <p>
                Price history data is based on public records and listing information. 
                It may not reflect all historical price changes or transactions for this property.
              </p>
            </div>
          </div>
        </div>
      )}
      
      {/* Market Trends Tab */}
      {activeTab === 'market' && (
        <div className="bg-gray-50 rounded-lg p-4 md:p-6 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6">
            {/* Current vs Estimated */}
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:border-blue-100 transition-colors">
              <h3 className="font-semibold text-gray-700 mb-3 flex items-center">
                <DollarSign size={18} className="text-blue-600 mr-2" />
                Price Comparison
              </h3>
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600">List Price:</span>
                <span className="font-bold text-gray-900 price-highlight">{formatPrice(currentPrice)}</span>
              </div>
              {estimatedValue && (
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600">Estimated Value:</span>
                  <span className="font-bold text-gray-900">{formatPrice(estimatedValue)}</span>
                </div>
              )}
              {neighborhoodMedianPrice && (
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Neighborhood Median:</span>
                  <span className="font-bold text-gray-900">{formatPrice(neighborhoodMedianPrice)}</span>
                </div>
              )}
              
              <div className="mt-4 pt-4 border-t border-gray-100">
                {estimatedValue && (
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-600">vs. Estimated Value:</span>
                    <div className="flex items-center">
                      <div 
                        className={`w-16 h-1.5 rounded-full mr-2 ${
                          priceComparisonToEstimate < -5 
                            ? 'bg-green-500' 
                            : priceComparisonToEstimate > 5 
                              ? 'bg-red-500' 
                              : 'bg-yellow-500'
                        }`}
                      >
                        <div 
                          className={`h-full rounded-full ${
                            priceComparisonToEstimate < 0 
                              ? 'bg-green-300' 
                              : priceComparisonToEstimate > 0 
                                ? 'bg-red-300' 
                                : 'bg-yellow-300'
                          }`}
                          style={{ width: `${Math.min(Math.abs(priceComparisonToEstimate), 100)}%` }}
                        ></div>
                      </div>
                      <span className={`font-medium ${priceComparisonToEstimate < 0 ? 'text-green-600' : priceComparisonToEstimate > 0 ? 'text-red-600' : 'text-gray-600'}`}>
                        {priceComparisonToEstimate > 0 ? '+' : ''}{priceComparisonToEstimate}%
                      </span>
                    </div>
                  </div>
                )}
                
                {neighborhoodMedianPrice && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">vs. Neighborhood Median:</span>
                    <div className="flex items-center">
                      <div 
                        className={`w-16 h-1.5 rounded-full mr-2 ${
                          priceComparisonToMedian < -5 
                            ? 'bg-green-500' 
                            : priceComparisonToMedian > 5 
                              ? 'bg-red-500' 
                              : 'bg-yellow-500'
                        }`}
                      >
                        <div 
                          className={`h-full rounded-full ${
                            priceComparisonToMedian < 0 
                              ? 'bg-green-300' 
                              : priceComparisonToMedian > 0 
                                ? 'bg-red-300' 
                                : 'bg-yellow-300'
                          }`}
                          style={{ width: `${Math.min(Math.abs(priceComparisonToMedian), 100)}%` }}
                        ></div>
                      </div>
                      <span className={`font-medium ${priceComparisonToMedian < 0 ? 'text-green-600' : priceComparisonToMedian > 0 ? 'text-red-600' : 'text-gray-600'}`}>
                        {priceComparisonToMedian > 0 ? '+' : ''}{priceComparisonToMedian}%
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Price Per Square Foot */}
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:border-blue-100 transition-colors">
              <h3 className="font-semibold text-gray-700 mb-3 flex items-center">
                <Calendar size={18} className="text-blue-600 mr-2" />
                Market Trends
              </h3>
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600">Property Price/Sq.ft.:</span>
                <span className="font-bold text-gray-900">${pricePerSqft}</span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600">Neighborhood Avg Price/Sq.ft.:</span>
                <span className="font-bold text-gray-900">${neighborhoodAvgPricePerSqft}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Annual Appreciation (5y):</span>
                <span className="font-bold text-green-600">+{annualAppreciation}%</span>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600">Property Age:</span>
                  <span className="font-medium text-gray-900">
                    {yearBuilt ? `${new Date().getFullYear() - yearBuilt} years` : 'N/A'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Neighborhood Demand:</span>
                  <div className="flex items-center">
                    <div className="flex space-x-0.5 mr-2">
                      {[1, 2, 3, 4].map(i => (
                        <div 
                          key={i}
                          className={`w-2 h-6 rounded-sm ${i <= 3 ? 'bg-blue-500' : 'bg-gray-200'}`}
                          style={{ height: `${i * 6}px` }}
                        ></div>
                      ))}
                    </div>
                    <span className="font-medium text-blue-600">High</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 animate-fade-in">
            <h3 className="font-semibold text-blue-800 mb-2 flex items-center">
              <Info size={18} className="text-blue-600 mr-2" />
              Market Insights
            </h3>
            <p className="text-blue-700 text-sm">
              Properties in this area have appreciated by <span className="font-medium">{annualAppreciation}%</span> annually over the past 5 years.
              This property is priced <span className="font-medium">{priceComparisonToMedian > 0 ? 'above' : 'below'}</span> the neighborhood median,
              which may indicate {priceComparisonToMedian > 5 ? 'premium features or amenities' : priceComparisonToMedian < -5 ? 'a potential value opportunity' : 'fair market pricing'}.
            </p>
            <button 
              className="mt-3 text-sm font-medium text-blue-700 hover:text-blue-800 flex items-center button-interactive"
              onClick={() => window.open(`/market-report/${propertyId}`, '_blank')}
            >
              View Full Market Report
              <ArrowRight size={14} className="ml-1" />
            </button>
          </div>
          
          <div className="text-sm text-gray-500 mt-4">
            <div className="flex items-start">
              <Info size={16} className="text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
              <p>
                Market data is for informational purposes only and is based on recent sales and market trends.
                Actual property values may vary. Consult with a real estate professional for a detailed analysis.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 