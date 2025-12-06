import React from "react";

const Loader = () => {
  return (
    <div>
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center ">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4  border-cyan-500 border-solid"></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Loader;
