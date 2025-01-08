import React from "react";

const Membership = () => {
  return (
    <div className="p-2">
      <div className="relative max-w-4xl mx-auto">
        <div className="max-w-xl mx-auto rounded-lg shadow-lg overflow-hidden lg:max-w-none lg:flex">
          <div className="flex-1 px-4 py-6 lg:p-6 bg-gray-600">
            <h3 className="text-sm font-semibold text-white">
              Lifetime Access
            </h3>
            <p className="mt-2 text-gray-50 text-xs">
              The Team subscription grants your entire As a subscriber to our
              website, you&apos;ll have access to a wide range of exclusive
              benefits and perks.
            </p>
            <div className="mt-4">
              <div className="flex items-center">
                <div className="flex-1 border-t-2 border-gray-200" />
              </div>
              <ul className="mt-4 text-xs lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-x-4 lg:gap-y-2">
                <li className="flex items-start lg:col-span-1">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-5 w-5 text-green-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <p className="ml-3 text-white">Access to premium content</p>
                </li>
                <li className="flex items-start lg:col-span-1">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-5 w-5 text-green-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <p className="ml-3 text-white">Followers member badge</p>
                </li>
                <li className="flex items-start lg:col-span-1">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-5 w-5 text-green-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <p className="ml-3 text-white">Automated application</p>
                </li>
                <li className="flex items-start lg:col-span-1">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-5 w-5 text-green-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <p className="ml-3 text-white">Dedicated customer support</p>
                </li>
              </ul>
            </div>
          </div>
          <div className="p-4 text-center lg:flex-shrink-0 lg:flex lg:flex-col lg:justify-center lg:p-8 bg-gray-800">
            <p className="text-md leading-6 font-medium text-white">
              Pay once, own it forever
            </p>
            <div className="mt-2 flex items-center justify-center text-2xl font-extrabold text-white">
              <span>$4.99</span>
              <span className="ml-3 text-xl font-medium text-gray-50">USD</span>
            </div>
            <div className="mt-2">
              <div className="rounded-md shadow">
                <a
                  href="#"
                  className="flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600"
                >
                  Buy now
                </a>
              </div>
              <p className="text-gray-300 text-sm mt-3">Limited Quota</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Membership;
