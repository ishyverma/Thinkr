interface ProgressBarProps {
    value: number;
}

const ProgressBar = ({ value }: ProgressBarProps) => {
    return ( 
        <div className="w-full h-full rounded">
            <div className="bg-[#1a5a8b] h-1 rounded" style={{ width: `${value}%` }}></div>
        </div>
    );
}
 
export default ProgressBar;