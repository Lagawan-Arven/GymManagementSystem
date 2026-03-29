import { Toaster as HotToaster, toast } from "react-hot-toast";

const Toaster = () => {
  return (
    <HotToaster
      position="top-right"
      gutter={12}
      containerStyle={{
        top: 20,
        right: 20,
      }}
      toastOptions={{
        duration: 3000,
        className: `
          flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg
          border backdrop-blur-md
          transition-all duration-300 ease-in-out
        `,
        success: {
          className: `
            bg-green-500/90 text-white border-green-400/30
            dark:bg-green-500/20 dark:text-green-300 dark:border-green-400/20
          `,
          iconTheme: {
            primary: "#22c55e",
            secondary: "#ecfdf5",
          },
        },
        error: {
          className: `
            bg-red-500/90 text-white border-red-400/30
            dark:bg-red-500/20 dark:text-red-300 dark:border-red-400/20
          `,
          iconTheme: {
            primary: "#ef4444",
            secondary: "#fef2f2",
          },
        },
        loading: {
          className: `
            bg-gray-800 text-white border-gray-700
            dark:bg-gray-900 dark:text-gray-200
          `,
        },
      }}
    />
  );
};

export default Toaster;

export const showSuccessToast = (message: string) => {
  toast.custom((t) => (
    <div
      className={`
        ${t.visible ? "animate-toast-in" : "animate-toast-out"}
        flex items-center gap-3 px-5 py-3 rounded-xl shadow-xl
        border backdrop-blur-md
        bg-white/90 text-gray-800 border-gray-200
        dark:bg-gray-900/80 dark:text-gray-100 dark:border-gray-700
      `}
    >
      {/* Icon */}
      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-500/20">
        <span className="text-green-500 text-lg">✔</span>
      </div>

      {/* Text */}
      <p className="text-sm font-medium">{message}</p>
    </div>
  ));
};
