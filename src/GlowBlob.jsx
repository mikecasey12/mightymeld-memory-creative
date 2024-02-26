const GlowBlob = () => {
  return (
    <div className='relative w-full max-w-lg'>
      <div className='h-40 w-40 bg-purple-300 absolute top-0 -left-2 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob dark:mix-blend-lighten'></div>
      <div className='h-40 w-40 bg-yellow-300 absolute top-0 right-12 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob animation-delay-2000 dark:mix-blend-lighten'></div>
      <div className='h-40 w-40 bg-blue-300 absolute top-4 right-12 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob animation-delay-6000 dark:mix-blend-lighten'></div>
      <div className='h-40 w-40 bg-pink-300 absolute top-4 left-20 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob animation-delay-4000 dark:mix-blend-lighten'></div>
    </div>
  );
};

export default GlowBlob;
