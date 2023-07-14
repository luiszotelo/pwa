function Label() {
  return (
    <div className="flex">
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-car-crane"
          width="44"
          height="44"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="#2c3e50"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M5 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
          <path d="M17 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
          <path d="M7 18h8m4 0h2v-6a5 5 0 0 0 -5 -5h-1l1.5 5h4.5" />
          <path d="M12 18v-11h3" />
          <path d="M3 17v-5h9" />
          <path d="M4 12v-6l18 -3v2" />
          <path d="M8 12v-4l-4 -2" />
        </svg>
        <p className="font-bold inline-block">Proveedor</p>
      </div>
    </div>
  );
}

export default Label;
