import logoUrl from '../../assets/logo.svg';

export default function HeadDefault() {
  return (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content="" />
      <link rel="icon" href={logoUrl} />
    </>
  );
}
