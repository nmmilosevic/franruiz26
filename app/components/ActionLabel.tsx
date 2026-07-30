export default function ActionLabel({ children }: { children: string }) {
  return (
    <span className="action-label">
      <span>{children}</span>
      <span className="action-label-clone" aria-hidden="true">{children}</span>
    </span>
  );
}
