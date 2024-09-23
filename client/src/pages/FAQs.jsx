import React, { useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
import FAQItem from "./FAQItem";
import styles from './FAQs.module.css'

const FAQs = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const handleItemClick = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };
  const data = [
    {
     question: 'What do I need to rent a car?',
     answer: "To book your car, all you need is a credit or debit card. When you pick the car up, you'll need Your voucher / eVoucher, to show that you've paid for the car.The main driver's credit / debit card, with enough available funds for the car's deposit.Each driver's full, valid driving licence, which they've held for at least 12 months (often 24).Your passport and any other ID the car hire needs to see."
    },
    {
     question: 'How old do I have to be to rent a car?',
     answer: "For most car rental companies, the age requirement is between 21 and 70 years old. If you're under 25 or over 70, you might have to pay an additional fee.",
    },
    {
     question: 'Can I book a rental car for someone else?',
     answer: "Yes, as long as they meet these requirements. Just fill in their details while you're making the reservation.",
    },
    {
     question: 'How do I find the cheapest car rental deal?',
     answer: "We work with all the major international car hire brands (and lots of smaller local companies) to bring you a huge choice of cars at the very best prices. That's how we can find you cheap car hire deals at over 60,000 locations worldwide. To compare prices and find your ideal car at an unbeatable price, just use our search form.",
    },
    {
     question: "What should I look for when I'm choosing a car?",
     answer: "• Space: You'll enjoy your rental far more if you choose a car with plenty of room for your passengers and luggage.• Fuel policy: Not planning on driving much? A Like for like fuel policy can save you a lot of money.• Location: You can't beat an 'on-airport' pick-up for convenience, but an 'off-airport' pick-up with a shuttle bus can be much cheaper.",
    },
    {
     question: 'Are all fees included in the rental price?',
     answer: "The vast majority of our rentals include Theft Protection, Collision Damage Waiver (CDW), local taxes, airport surcharges and any road fees. You'll pay for any 'extras' when you pick your car up, along with any young driver, additional driver or one-way fees but we'll explain any additional costs before you book your car (and taking your own child seats or GPS can be an easy way to reduce your costs). For more details on what's included, just check the Ts&Cs of any car you're looking at",
    }
   ];
  
//    export default data;

  return (
    <>
      <div className={`${styles["container"]} min-w-96`}>
        <h2 className="font-bold text-center">FAQs</h2>
      <div className={styles['accordian-container']}>
        {data.map((item, index) => (
          <FAQItem
            key={index}
            question={item.question}
            answer={item.answer}
            isOpen={activeIndex === index}
            onClick={() => handleItemClick(index)}
          />
        ))}
      </div>
      </div>
    </>
  );
};

export default FAQs;
