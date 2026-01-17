import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Header from "./Component/header";
import ShopPage from "./Pages/ShopPage";
export default function App() {
	return (
		<div className="w-full h-dvh bg-gray-100 overflow-auto">
			<BrowserRouter>
			<Header/>
				<Routes>
					<Route path="/" element={<ShopPage/>}/>
					<Route path="/cart"/>
				</Routes>
			</BrowserRouter>
			

		</div>
	)
}
