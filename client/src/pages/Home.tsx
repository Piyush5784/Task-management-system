import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 via-transparent to-transparent pb-12 ">
        <div className="relative z-10">
          <div className="absolute inset-x-0 top-1/2 -z-10 flex -translate-y-1/2 justify-center overflow-hidden [mask-image:radial-gradient(50%_45%_at_50%_55%,white,transparent)]">
            <svg
              className="h-[60rem] w-[100rem] flex-none stroke-blue-600 opacity-20"
              aria-hidden="true"
            >
              <defs>
                <pattern
                  id="e9033f3e-f665-41a6-84ef-756f6778e6fe"
                  width="200"
                  height="200"
                  x="50%"
                  y="50%"
                  patternUnits="userSpaceOnUse"
                  patternTransform="translate(-100 0)"
                >
                  <path d="M.5 200V.5H200" fill="none"></path>
                </pattern>
              </defs>
              <svg x="50%" y="50%" className="overflow-visible fill-blue-50">
                <path
                  d="M-300 0h201v201h-201Z M300 200h201v201h-201Z"
                  stroke-width="0"
                ></path>
              </svg>
              <rect
                width="100%"
                height="100%"
                stroke-width="0"
                fill="url(#e9033f3e-f665-41a6-84ef-756f6778e6fe)"
              ></rect>
            </svg>
          </div>
        </div>
        <div className="relative z-20 mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto  text-center">
            <div className="mx-auto  px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center lg:pt-32">
              <p className="mx-auto -mt-4  text-lg tracking-tight text-slate-700 sm:mt-6">
                Welcome to
                <span className="border-b border-dotted ml-2 border-slate-300">
                  Task Management App
                </span>
              </p>

              <h1 className="mx-auto max-w-4xl font-display text-5xl font-medium tracking-tight text-slate-900 sm:text-7xl">
                <span className="inline-block">
                  <span className="relative whitespace-nowrap text-blue-600">
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 418 42"
                      className="absolute top-2/3 left-0 h-[0.58em] w-full fill-blue-300/70"
                      preserveAspectRatio="none"
                    >
                      <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z"></path>
                    </svg>
                    <span className="relative">Manage</span>
                  </span>
                </span>
                <span className="inline-block">Your Tasks Efficiently</span>
              </h1>

              <p className="mx-auto mt-9 max-w-2xl text-lg tracking-tight text-slate-700 sm:mt-6">
                <span className="inline-block">
                  Organize, prioritize, and track your tasks
                </span>
                <span className="inline-block">with our powerful tools.</span>
              </p>

              <div className="mt-12 flex flex-col justify-center gap-y-5 sm:mt-10 sm:flex-row sm:gap-y-0 sm:gap-x-6">
                <Link
                  className="group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-slate-900 text-white hover:bg-slate-700 hover:text-slate-100 active:bg-slate-800 active:text-slate-300 focus-visible:outline-slate-900 animate-fade-in-left"
                  to="/register"
                >
                  Get Started
                </Link>
                <div
                  className="relative flex flex-1 flex-col items-stretch sm:flex-none"
                  data-headlessui-state=""
                >
                  <button
                    className="group inline-flex ring-1 items-center justify-center rounded-full py-2 px-4 text-sm focus:outline-none ring-slate-200 text-slate-700 hover:text-slate-900 hover:ring-slate-300 active:bg-slate-100 active:text-slate-600 focus-visible:outline-blue-600 focus-visible:ring-slate-300 animate-fade-in-right"
                    id="headlessui-menu-button-:r4:"
                    aria-haspopup="true"
                    aria-expanded="false"
                    data-headlessui-state=""
                    type="button"
                  >
                    <Link className="" to="/login">
                      Login
                    </Link>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="relative mx-auto mt-10 max-w-lg">
            <img
              className="w-full rounded-2xl border border-gray-100 shadow"
              src="https://images.unsplash.com/photo-1587502536575-6dfba0a6e017"
              alt=""
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
