const paths = {
  arrow: <><path d="M5 12h14M13 6l6 6-6 6" /></>,
  mail: <><rect x="3" y="5" width="18" height="14" rx="3" /><path d="m3 7 9 6 9-6" /></>,
  lock: <><rect x="5" y="10" width="14" height="11" rx="3" /><path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3" /></>,
  eye: <><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z" /><circle cx="12" cy="12" r="3" /></>,
  eyeOff: <><path d="m3 3 18 18M10.6 5.1 12 5c6.4 0 10 7 10 7a21 21 0 0 1-3 3.7M6.3 6.3A22 22 0 0 0 2 12s3.6 7 10 7a12 12 0 0 0 5.7-1.7M10 10a3 3 0 0 0 4 4" /></>,
  help: <><circle cx="12" cy="12" r="9" /><path d="M9.5 9a2.5 2.5 0 1 1 4.3 1.7c-1 .7-1.8 1-1.8 2.8M12 17h.01" /></>,
  shield: <><path d="m12 3 8 3v6c0 4.5-5 8-8 9-3-1-8-4.5-8-9V6l8-3Z" /><path d="m8.5 12 2.5 2.5 4.5-5" /></>,
  check: <><path d="m5 12 4 4L19 6" /></>,
  close: <><path d="m6 6 12 12M6 18 18 6" /></>,
  info: <><circle cx="12" cy="12" r="9" /><path d="M12 11v6M12 7h.01" /></>,
  pin: <><path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
};

export default function Icon({ name, size = 20, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      {paths[name]}
    </svg>
  );
}
