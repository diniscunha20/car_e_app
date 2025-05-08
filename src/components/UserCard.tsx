type UserCardProps = {
    name?: string;
    onClick?: () => void;
};

function UserCard({name, onClick}: UserCardProps) {
    return (
        <button className="btn rounded-3xl w-[85%] h-15 mb-6" onClick={onClick}>{name}</button>
    );
}

export default UserCard;