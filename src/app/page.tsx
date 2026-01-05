import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Temporary Closure Notice - HappyDeel',
  description: 'HappyDeel is temporarily closed due to high volume of orders. We appreciate your patience and understanding.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function ClosureNoticePage() {
  return (
    <div className="min-h-screen w-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-12">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-xl p-8 md:p-12 text-center">
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <img
            src="/logosvg.svg"
            alt="HappyDeel Logo"
            width="200"
            height="60"
            className="w-48 h-auto max-w-[200px]"
            style={{ display: 'block', maxWidth: '200px', height: 'auto' }}
            loading="eager"
          />
        </div>

        {/* Closure Notice */}
        <div className="space-y-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Temporary Closure Notice
          </h1>
          
          <div className="text-lg md:text-xl text-gray-700 space-y-4 leading-relaxed">
            <p>
              Due to the high volume of orders this holiday season, we are temporarily closed until we manage to fulfill the massive amount of orders we currently have.
            </p>
            
            <p>
              We are experiencing some delays in processing and shipping. We appreciate your patience and understanding during this busy period.
            </p>
          </div>

          {/* Contact Information */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-gray-600 mb-2">For more information, please contact us at:</p>
            <Link
              href="mailto:support@happydeel.com"
              className="text-blue-600 hover:text-blue-800 font-semibold text-lg transition-colors"
            >
              support@happydeel.com
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
