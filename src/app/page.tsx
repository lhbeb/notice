import Image from 'next/image';

export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
      <div className="max-w-2xl mx-auto text-center w-full">
        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
          <div className="mb-8 flex justify-center">
            <Image 
              src="/logosvg.svg" 
              alt="HappyDeel Logo"
              width={192}
              height={40}
              priority
              className="w-48"
            />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Temporary Closure Notice
          </h1>
          <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
            <p>
              Due to the high volume of orders this holiday season, we are temporarily closed 
              until we manage to fulfill the massive amount of orders we currently have.
            </p>
            <p>
              We are experiencing some delays in processing and shipping. We appreciate your 
              patience and understanding during this busy period.
            </p>
            <p className="pt-4 border-t border-gray-200">
              For more information, please contact us at{' '}
              <a 
                href="mailto:support@happydeel.com" 
                className="text-[#0046be] hover:text-[#003399] font-semibold underline transition-colors"
              >
                support@happydeel.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
