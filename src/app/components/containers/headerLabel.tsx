interface TitleLabelProps {
    title?: string;
    subtitle?: string;
}
export function TitleLabel({ title = "ຍິນດີຕ້ອນຮັບ!", subtitle = "." }: TitleLabelProps): JSX.Element {
  return (
    <div className="mb-2 flex items-center justify-between space-y-2">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
        <p className="text-muted-foreground">{subtitle}</p>
      </div>
    </div>
  );
}
