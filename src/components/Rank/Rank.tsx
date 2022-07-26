interface IProps {
  name: string;
  entries: number;
}

const Rank = ({ name, entries }: IProps) => {
  return (
    <div>
      <div className="white f3">
        {`${name}, your current entry count is...`}
      </div>
      <div className="white f1">{entries}</div>
    </div>
  );
};

export default Rank;
