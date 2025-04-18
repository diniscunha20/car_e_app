function Avatar({ name }: { name?: string }, ChangeAccount: () => void) {
  return (
    <div className="w-2/3 flex items-center justify-start">
      <div className="avatar">
        <div className="w-20 rounded-full ring-3 ring-stone-700 ring-offset-2 ring-offset-[#F8F8E0]">
          <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>
      </div>
      <div className="ml-4 flex flex-col items-start">
        <h2 className="text-2xl font-medium text-left text-black">{name}</h2>
        <button oncClick={ChangeAccount} className="text-sm font-extralight link text-black">mudar de conta</button>
      </div>
    </div>
  );
}
export default Avatar;

