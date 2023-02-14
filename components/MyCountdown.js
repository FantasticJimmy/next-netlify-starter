import Countdown from "react-countdown";
import dynamic from "next/dynamic";
const Flip = dynamic(() => import("@components/Flip"), { ssr: false });

var dt = new Date(new Date("2023-02-25"));
console.log(dt); // Gives Tue Mar 22 2016 09:30:00 GMT+0530 (IST)

dt.setTime(dt.getTime() + dt.getTimezoneOffset() * 60 * 1000);
console.log(dt); // Gives Tue Mar 22 2016 04:00:00 GMT+0530 (IST)

export default function MyCountdown() {
  return (
    <Countdown date={dt} renderer={renderer}>
      <Completionist />
    </Countdown>
  );
}

const renderer = ({ days, hours, minutes, seconds }) => (
  <div>
    <div className="count-down-group">
      <div className="countDownSection">
        <Flip value={days} /> <span>days</span>
      </div>
      <div className="countDownSection">
        <Flip value={hours} /> <span>hours</span>
      </div>
      <div className="countDownSection">
        <Flip value={minutes} /> <span>minutes</span>
      </div>
      <div className="countDownSection">
        <Flip value={seconds} /> <span>seconds</span>
      </div>
      <br />
    </div>
  </div>
);

const Completionist = () => <div>JAPAN!</div>;
