function Avatar({ name, ChangeAccount }: { name?: string; ChangeAccount: () => void }) {
  return (
    <div className="w-auto flex items-center justify-start p-6">
      <div className="avatar">
        <div className="w-27 rounded-full ring-2 ring-stone-700 ring-offset-2 ring-offset-[#F8F8E0]">
          <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>
      </div>
      <div className="ml-4 flex flex-col items-start">
        <h2 className="text-3xl font-medium text-left text-black">{name}</h2>
        <button onClick={() => window.location.href = '/login'} className="text- font-extralight link text-black">mudar de conta</button>
      </div>
    </div>
  );
}
export default Avatar;

