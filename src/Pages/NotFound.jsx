import { Navigate, useNavigate } from "react-router-dom";
export default function  NotFound () {
    let navigate=useNavigate()
  return (
    <div className="min-h-screen bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text flex items-center justify-center">
      <div className="text-center space-y-8 px-4">
        <h1 className="text-9xl
     font-bold  animate-pulse">404</h1>

        {/* Oops Message */}
        <div className="space-y-4 animate-fade-in">
          <h2 className="text-4xl font-bold text-foreground animate-pulse">
            Oops!
          </h2>
          <p className="text-xl text-muted-foreground max-w-md mx-auto leading-relaxed">
            Something went wrong. The page you're looking for doesn't exist.
          </p>
        </div>

        {/* Animated Decorative Elements */}
        <div className="flex justify-center space-x-4 animate-bounce">
          <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
          <div className="w-3 h-3 bg-primary rounded-full animate-pulse delay-100"></div>
          <div className="w-3 h-3 bg-primary rounded-full animate-pulse delay-200"></div>
        </div>

          <button
          onClick={()=>navigate(-1)}
           className="custom-button rounded-lg font-medium hover:bg-primary/90 transition-all duration-300 hover:scale-105 hover:shadow-lg">
            Go-back
          </button>
      </div>
    </div>
  );
};

