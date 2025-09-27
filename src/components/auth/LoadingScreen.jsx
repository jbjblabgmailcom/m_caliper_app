import './LoadingScreen.css';

export default function LoadingScreen() {
  return (
    <div className="loading-container">
      <svg
        className="loading-spinner"
        viewBox="0 0 50 50"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="25"
          cy="25"
          r="20"
          fill="none"
          stroke="#10598a"
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray="100"
          strokeDashoffset="60"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            dur="1s"
            from="0 25 25"
            to="360 25 25"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
      <p className="loading-text">Authenticating...</p>
    </div>
  );
}