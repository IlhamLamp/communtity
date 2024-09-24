import { faAt, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const LoginPage: React.FC = () => {
    return (
        <div className="container mx-auto mt-14 bg-gray-100 lg:rounded-3xl">
			<div className="flex justify-center px-6 py-8 lg:py-2">
				<div className="w-full xl:w-3/4 lg:w-11/12 flex shadow-xl rounded-3xl">
					<div
						className="w-full h-auto bg-gray-400 hidden lg:block lg:w-5/12 bg-cover rounded-l-3xl"
						style={{ backgroundImage: "url('./assets/signup.jpg')" }} 
					/>
					<div className="w-full lg:w-7/12 bg-white p-5 lg:rounded-r-3xl">
						<h3 className="text-2xl text-center">Login with your account!</h3>
						<form className="px-8 pt-6 pb-8 mb-4 bg-white rounded">
							<div className="mb-4">
								<div className="flex gap-2 items-center mb-2">
									<FontAwesomeIcon icon={faAt} />
									<label className="block text-sm font-bold text-gray-700" htmlFor="email">
										Email
									</label>
								</div>
								<input
									className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
									id="email"
									type="email"
									placeholder="Email"
								/>
							</div>
							<div className="mb-4">
                                <div className="flex gap-2 items-center mb-2">
                                    <FontAwesomeIcon icon={faLock} />	
                                    <label className="block text-sm font-bold text-gray-700" htmlFor="password">
                                        Password
                                    </label>
                                </div>
                                <input
                                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border border-red-500 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                    id="password"
                                    type="password"
                                    placeholder="******************"
                                />
                                <p className="text-xs italic text-red-500">Invalid password.</p>
							</div>
							<div className="mb-3 text-center">
								<button
									className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
									type="button"
								>
									Login
								</button>
							</div>
							<div className="flex flex-col mx-auto items-center gap-4 mb-4">
								<p className="text-sm text-gray-700 ">or, continue with</p>
								<div className="flex justify-center items-center space-x-4">
									<button className="flex items-center space-x-2 bg-white shadow-md border border-gray-100 rounded-full px-4 py-2">
									<img src="https://tailus.io/sources/blocks/social/preview/images/google.svg" className="h-5 w-5" alt="google logo" />
										<span className="text-sm text-gray-700 ">Google</span>
									</button>
									<button className="flex items-center space-x-2 bg-white shadow-md border border-gray-100 rounded-full px-4 py-2">
										<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="h-5 w-5" viewBox="0 0 16 16">
											<path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
										</svg>
										<span className="text-sm text-gray-700 ">GitHub</span>
									</button>
								</div>
							</div>
							<hr className="mb-6 border-t" />
							<div className="text-center">
								<a
									className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
									href="#"
								>
									Forgot Password?
								</a>
							</div>
							<div className="text-center">
								<a
									className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
									href="/signup"
								>
									Don't have an account? Sign up!
								</a>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
    )
}

export default LoginPage;