'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const PrivacyPolicyPage = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
      <p className="text-gray-600 mb-8">
        Last updated: {new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })}
      </p>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Introduction</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            db/ux IDX Solution ("we," "our," or "us") respects your privacy and is committed to protecting it through our compliance with this policy.
          </p>
          <p className="mb-4">
            This policy describes the types of information we may collect from you or that you may provide when you visit our website and our practices for collecting, using, maintaining, protecting, and disclosing that information.
          </p>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Information We Collect</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">We collect several types of information from and about users of our website, including information:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>By which you may be personally identified, such as name, email address, telephone number ("personal information");</li>
            <li>About your internet connection, the equipment you use to access our website, and usage details;</li>
            <li>About your property preferences and search criteria when using our real estate search features.</li>
          </ul>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>How We Use Your Information</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">We use information that we collect about you or that you provide to us, including any personal information:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>To present our website and its contents to you;</li>
            <li>To provide you with information about properties that may interest you;</li>
            <li>To fulfill any other purpose for which you provide it;</li>
            <li>To carry out our obligations and enforce our rights;</li>
            <li>To notify you about changes to our website or any products or services we offer;</li>
            <li>In any other way we may describe when you provide the information;</li>
            <li>For any other purpose with your consent.</li>
          </ul>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Disclosure of Your Information</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">We may disclose aggregated information about our users without restriction. We may disclose personal information that we collect or you provide as described in this privacy policy:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>To our subsidiaries and affiliates;</li>
            <li>To contractors, service providers, and other third parties we use to support our business;</li>
            <li>To a buyer or other successor in the event of a merger, divestiture, restructuring, reorganization, dissolution, or other sale or transfer of some or all of our assets;</li>
            <li>To fulfill the purpose for which you provide it;</li>
            <li>For any other purpose disclosed by us when you provide the information;</li>
            <li>With your consent.</li>
          </ul>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Data Security</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            We have implemented measures designed to secure your personal information from accidental loss and from unauthorized access, use, alteration, and disclosure. All information you provide to us is stored on secure servers behind firewalls.
          </p>
          <p className="mb-4">
            The safety and security of your information also depends on you. Where we have given you (or where you have chosen) a password for access to certain parts of our website, you are responsible for keeping this password confidential. We ask you not to share your password with anyone.
          </p>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Changes to Our Privacy Policy</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            It is our policy to post any changes we make to our privacy policy on this page. If we make material changes to how we treat our users' personal information, we will notify you through a notice on the website home page.
          </p>
          <p>
            The date the privacy policy was last revised is identified at the top of the page. You are responsible for periodically visiting our website and this privacy policy to check for any changes.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            To ask questions or comment about this privacy policy and our privacy practices, contact us at:
          </p>
          <p className="font-medium">privacy@dbuxidxsolution.com</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PrivacyPolicyPage; 