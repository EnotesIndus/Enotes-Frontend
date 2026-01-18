export default function InputBox({ input, setInput }) {
  return (
    <textarea 
      className="w-full border-0 outline-none resize-none p-3 bg-gray-50"
      placeholder="Input (stdin)"
      value={input}
      onChange={e => setInput(e.target.value)}
      rows={4}
    />
  );
}