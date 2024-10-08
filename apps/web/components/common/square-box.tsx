interface SquareBoxProps {
  title?:string;
  note: string;
}

const SquareBox: React.FC<SquareBoxProps> = ({ note, title }) => {
  return (
    <div className="rounded-xl bg-[#313131] hover:bg-[#383C43] cursor-pointer transition-colors flex flex-col items-center justify-center px-3 py-7">
      <p className="font-medium">{title}</p>
      <p className="text-5xl font-semibold">{ note }</p>
    </div>
  )
}

export default SquareBox