'use client';

import { useState, useEffect, useMemo, memo } from 'react';
import { DollarSign, Percent, Calendar, BarChart2, RefreshCw, ArrowRight, HelpCircle, Printer } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

interface MortgageCalculatorProps {
  propertyPrice: number;
}

const MortgageCalculator = memo(function MortgageCalculator({ propertyPrice }: MortgageCalculatorProps) {
  // Default values
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [downPaymentAmount, setDownPaymentAmount] = useState(() => 
    Math.round(propertyPrice * 0.2)
  );
  const [interestRate, setInterestRate] = useState(4.5);
  const [loanTerm, setLoanTerm] = useState(30);
  const [propertyTax, setPropertyTax] = useState(Math.round(propertyPrice * 0.012 / 12));
  const [homeInsurance, setHomeInsurance] = useState(100);
  
  // Compute loan amount
  const loanAmount = useMemo(() => propertyPrice - downPaymentAmount, [propertyPrice, downPaymentAmount]);
  
  // Calculate mortgage payment and total payment
  const { monthlyPayment, principalAndInterest, totalPayment } = useMemo(() => {
    // Principal and interest calculation
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;
    const pAndI = monthlyRate === 0
      ? loanAmount / numberOfPayments
      : (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    
    // Total monthly payment including taxes and insurance
    const total = pAndI + propertyTax + homeInsurance;
    
    return {
      principalAndInterest: Math.round(pAndI),
      monthlyPayment: Math.round(total),
      totalPayment: Math.round(total * numberOfPayments)
    };
  }, [loanAmount, interestRate, loanTerm, propertyTax, homeInsurance]);
  
  // Update down payment amount when percentage changes
  useEffect(() => {
    const newAmount = Math.round(propertyPrice * (downPaymentPercent / 100));
    setDownPaymentAmount(newAmount);
  }, [downPaymentPercent, propertyPrice]);
  
  // Format currency for display
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };
  
  // Handle form input changes
  const handleDownPaymentPercentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setDownPaymentPercent(value);
  };
  
  const handleDownPaymentAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setDownPaymentAmount(value);
    // Update percentage based on new amount
    const newPercent = Math.round((value / propertyPrice) * 100);
    setDownPaymentPercent(newPercent);
  };
  
  const handleInterestRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInterestRate(Number(e.target.value));
  };
  
  const handleLoanTermChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLoanTerm(Number(e.target.value));
  };
  
  const handlePropertyTaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPropertyTax(Number(e.target.value));
  };
  
  const handleHomeInsuranceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHomeInsurance(Number(e.target.value));
  };
  
  const handlePrintEstimate = () => {
    window.print();
  };
  
  // Function to get the contact form element and scroll to it
  const handleContactAgent = () => {
    const contactForm = document.querySelector('.property-contact-form');
    if (contactForm) {
      contactForm.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white">
        <h3 className="text-xl font-bold">Mortgage Calculator</h3>
        <p className="text-blue-100 text-sm mt-1">Estimate your monthly mortgage payment</p>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            {/* Property Price */}
            <div>
              <div className="flex justify-between mb-1">
                <label className="text-sm font-medium text-gray-700">
                  Property Price
                </label>
                <span className="text-sm font-semibold text-gray-900">
                  {formatCurrency(propertyPrice)}
                </span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div 
                  className="h-2 bg-blue-600 rounded-full" 
                  style={{ width: '100%' }}
                ></div>
              </div>
            </div>
            
            {/* Down Payment */}
            <div>
              <div className="flex justify-between mb-1">
                <label className="text-sm font-medium text-gray-700">
                  Down Payment ({downPaymentPercent}%)
                </label>
                <span className="text-sm font-semibold text-gray-900">
                  {formatCurrency(downPaymentAmount)}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="range"
                  min="0"
                  max="50"
                  step="1"
                  value={downPaymentPercent}
                  onChange={handleDownPaymentPercentChange}
                  className="flex-grow"
                />
                <input
                  type="number"
                  min="0"
                  max={propertyPrice}
                  value={downPaymentAmount}
                  onChange={handleDownPaymentAmountChange}
                  className="w-24 p-1 border border-gray-300 rounded"
                />
              </div>
            </div>
            
            {/* Loan Amount */}
            <div>
              <div className="flex justify-between mb-1">
                <label className="text-sm font-medium text-gray-700">
                  Loan Amount
                </label>
                <span className="text-sm font-semibold text-gray-900">
                  {formatCurrency(loanAmount)}
                </span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div 
                  className="h-2 bg-green-500 rounded-full" 
                  style={{ width: `${(loanAmount / propertyPrice) * 100}%` }}
                ></div>
              </div>
            </div>
            
            {/* Loan Term */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Loan Term
              </label>
              <select
                value={loanTerm}
                onChange={handleLoanTermChange}
                className="block w-full p-2 border border-gray-300 rounded"
              >
                <option value="30">30 Years</option>
                <option value="20">20 Years</option>
                <option value="15">15 Years</option>
                <option value="10">10 Years</option>
              </select>
            </div>
            
            {/* Interest Rate */}
            <div>
              <div className="flex justify-between mb-1">
                <label className="text-sm font-medium text-gray-700">
                  Interest Rate ({interestRate}%)
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="range"
                  min="0.1"
                  max="10"
                  step="0.1"
                  value={interestRate}
                  onChange={handleInterestRateChange}
                  className="flex-grow"
                />
                <input
                  type="number"
                  min="0.1"
                  max="20"
                  step="0.1"
                  value={interestRate}
                  onChange={handleInterestRateChange}
                  className="w-16 p-1 border border-gray-300 rounded"
                />
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            {/* Additional Costs */}
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h4 className="font-medium text-gray-900 mb-3">Additional Costs</h4>
              
              {/* Property Tax */}
              <div className="mb-4">
                <div className="flex justify-between mb-1">
                  <label className="text-sm text-gray-700">
                    Property Tax (monthly)
                  </label>
                  <div className="flex items-center gap-2">
                    <DollarSign size={14} className="text-gray-400" />
                    <input
                      type="number"
                      value={propertyTax}
                      onChange={handlePropertyTaxChange}
                      className="w-24 px-2 py-1 text-right text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
              
              {/* Home Insurance */}
              <div className="mb-4">
                <div className="flex justify-between mb-1">
                  <label className="text-sm text-gray-700">
                    Home Insurance (monthly)
                  </label>
                  <div className="flex items-center gap-2">
                    <DollarSign size={14} className="text-gray-400" />
                    <input
                      type="number"
                      value={homeInsurance}
                      onChange={handleHomeInsuranceChange}
                      className="w-24 px-2 py-1 text-right text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Payment Breakdown Visualization */}
            <div className="pt-4">
              <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                <BarChart2 size={18} className="text-blue-600 mr-2" />
                Payment Breakdown
              </h4>
              
              {/* Visual Payment Breakdown */}
              <div className="h-8 w-full rounded-full overflow-hidden flex">
                <div 
                  className="bg-blue-600" 
                  style={{ width: `${(principalAndInterest / monthlyPayment) * 100}%` }}
                  title="Principal & Interest"
                ></div>
                <div 
                  className="bg-green-500" 
                  style={{ width: `${(propertyTax / monthlyPayment) * 100}%` }}
                  title="Property Tax"
                ></div>
                <div 
                  className="bg-orange-400" 
                  style={{ width: `${(homeInsurance / monthlyPayment) * 100}%` }}
                  title="Home Insurance"
                ></div>
              </div>
              
              {/* Legend */}
              <div className="mt-3 grid grid-cols-2 gap-x-2 gap-y-2 text-xs">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-600 rounded-full mr-2"></div>
                  <span>Principal & Interest: {formatCurrency(principalAndInterest)}</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <span>Property Tax: {formatCurrency(propertyTax)}</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-orange-400 rounded-full mr-2"></div>
                  <span>Insurance: {formatCurrency(homeInsurance)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Monthly Payment Summary */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-100">
          <div className="sm:flex justify-between items-center">
            <div>
              <div className="text-sm text-blue-600 font-medium mb-1">Estimated Monthly Payment</div>
              <div className="text-3xl font-bold text-gray-900">
                {formatCurrency(monthlyPayment)}<span className="text-sm font-normal text-gray-600">/mo</span>
              </div>
            </div>
            
            <div className="mt-4 sm:mt-0 sm:flex gap-3">
              <button 
                onClick={handlePrintEstimate}
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
              >
                <Printer size={16} className="mr-2" />
                Print Estimate
              </button>
              
              <button
                onClick={handleContactAgent}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
              >
                <Calendar size={16} className="mr-2" />
                Talk to an Agent
              </button>
            </div>
          </div>
          
          <div className="mt-4 text-sm text-gray-600 flex items-start">
            <HelpCircle size={16} className="text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
            <p>This estimate includes principal, interest, property taxes, home insurance, and HOA dues. Actual payment will vary based on your specific situation and current rates.</p>
          </div>
        </div>
      </div>
    </div>
  );
});

export default MortgageCalculator; 