import React from 'react';

function LogoBand() {
  return (
    <div className="">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-semibold uppercase  tracking-wide">
          Trusted by over 5 very average small businesses
        </p>
        <div className="mt-6 grid grid-cols-2 gap-8 md:grid-cols-6 lg:grid-cols-5">
          <div className="col-span-1 flex justify-center md:col-span-2 lg:col-span-1">
            <img
              className="h-24"
              src="https://www.teamusa.org/-/media/USA_Wrestling/2020-Refresh/2021-RGB-V-USAWLogo-mat.png"
              alt="Tuple"
            />
          </div>
          <div className="col-span-1 flex justify-center md:col-span-2 lg:col-span-1">
            <img
              className="h-24"
              src="https://upload.wikimedia.org/wikipedia/en/4/40/American_Top_Team_Logo.png"
              alt="Mirage"
            />
          </div>
          <div className="col-span-1 flex justify-center md:col-span-2 lg:col-span-1">
            <img
              className="h-24"
              src="https://upload.wikimedia.org/wikipedia/en/0/09/Black_house_logo.png"
              alt="StaticKit"
            />
          </div>
          <div className="col-span-1 flex justify-center md:col-span-2 md:col-start-2 lg:col-span-1">
            <img
              className="h-24"
              src="https://smoothcomp.com/pictures/t/115186-yzhp/atos.jpg?embedView=true"
              alt="Transistor"
            />
          </div>
          <div className="col-span-2 flex justify-center md:col-span-2 md:col-start-4 lg:col-span-1">
            <img
              className="h-24"
              src="https://phuketfighters.com/wp-content/uploads/2016/06/Tiger.jpg"
              alt="Workcation"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LogoBand;
