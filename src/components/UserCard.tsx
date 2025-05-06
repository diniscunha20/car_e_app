function UserCard({name}: { name?: string }) {
    return (
        <button className="btn rounded-3xl w-[85%] h-15 mb-6">{name}</button>
    );
}

export default UserCard;