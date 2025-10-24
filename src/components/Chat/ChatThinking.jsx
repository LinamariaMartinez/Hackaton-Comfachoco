const ChatThinking = () => {
  return (
    <div className="flex justify-start">
      <div className="bg-gray-100 rounded-lg p-3">
        <div className="flex gap-1">
          <div className="w-2 h-2 bg-gray-medium rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-2 h-2 bg-gray-medium rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-2 h-2 bg-gray-medium rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  );
};

export default ChatThinking;
