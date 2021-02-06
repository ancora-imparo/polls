export default function Display(props) {
  const { poll } = props;
  const keys = Object.keys(poll.options);
  const opt = keys.map((key) => <div key={key}>{poll.options[key].value}</div>);
  return (
    <>
      <div>{poll.question}</div>
      <div>{opt}</div>
    </>
  );
}
