import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Header from "./Component/Header";
import ShopPage from "./Pages/ShopPage";
import CartPage from "./Pages/CartPage";
import { useState } from "react";
export default function App() {
	const [isDark, setIsDark] = useState(false);
	return (
		<div className={' w-full h-dvh overflow-auto bg-gray-100 dark:bg-dark-900 text-black dark:text-white' + isDark && 'dark'} data-theme={isDark ? 'dark' : 'light'}>
			<BrowserRouter>
				<Header />
				<Routes>
					<Route path="/" element={<ShopPage />} />
					<Route path="/cart" element={<CartPage />} />
					<Route path="*" element={<h1>Error 404 | Page Not Found</h1>} />
				</Routes>
			</BrowserRouter>
			<fieldset className="fieldset bg-base-100 border-base-300 rounded-box w-32  border p-4">
				<legend className="fieldset-legend"></legend>
				<label className="label">
					<input type="checkbox" onClick={() => setIsDark(!isDark)} defaultChecked className="toggle" />
					Dark Mood
				</label>
			</fieldset>
		</div>
	);
}