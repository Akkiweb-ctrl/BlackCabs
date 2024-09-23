import React from "react";

const AboutUs = () => {
  return (
    <div className="w-3/5 mx-auto min-w-80">
      <div>
        <h1 className="w-max mx-auto font-bold text-2xl mb-4">About Us</h1>
      </div>
      <div>
        <p className="mb-4">
          BlackCabs is the world’s leading community-based travel network
          enabling over 90 million members to share a ride across 22 markets.
          BlackCabs leverages technology to fill empty seats on the road,
          connecting members looking to carpool or to travel by bus, and making
          travel more affordable, sociable and convenient. BlackCabs’s
          environmentally and human-friendly mobility network saves 1.6M tons of
          CO2 and enables 120M human connections every year. HOW IT ALL
          STARTEDWhen Fred was trying to get home to his family in the French
          countryside for Christmas 2003, he struggled as he had no car and all
          the trains were full. After begging his sister to pick him up, it was
          on the road when Fred noticed the sheer number of people driving
          alone. It hit him that all those empty seats in existing cars could be
          the beginning of a new travel network. Over the next decade, together
          with co-founders Francis and Nicolas, the trio took this simple idea
          and built it into the world’s leading carpooling platform, connecting
          millions of people going the same way.{" "}
        </p>
        <ul className="list-disc mb-4">
          <h2 className="font-medium  text-lg">OUR KEY NUMBERS</h2>
          <li>90 million members</li>
          <li>22 countries</li>
          <li>25 million travelers per quarter</li>
          <li>
            More than €1.4 billion saved by members since BlackCabs’s creation
          </li>
          <li>263 kilometers is the average distance of a BlackCabs trip</li>
          <li>
            30 billions kilometers shared by the community since BlackCabs’s
            creation
          </li>
        </ul>
        <p>
          BlackCabs doubles the occupancy rate of cars whilst operating a
          carbon-saving network. In total, 1.6 million tonnes of CO2 were saved
          by BlackCabs carpoolers in 2018, thanks to the relative efficiency of
          filled cars versus alternative modes of transport, members’ improved
          driving behaviors whilst carpooling, and the informal carpooling
          inspired by BlackCabs outside the platform.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
