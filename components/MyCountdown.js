import Countdown from "react-countdown";
import dynamic from "next/dynamic";
const Flip = dynamic(() => import("@components/Flip"), { ssr: false });

const feb25 = new Date("2023-02-25");
export default function MyCountdown() {
  return (
    <Countdown date={feb25} renderer={renderer}>
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
