"use client";

import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
	useCreateProductMutation,
	useDeleteProductMutation,
	useUpdateProductMutation,
} from "@/redux/service/product";
import {
	setAccessToken,
	selectAccessToken,
} from "@/redux/features/token/tokenSlice";

type CatageoryType = {
	name: string;
	icon: string;
};

type ProductPostType = {
	category: CatageoryType;
	name: string;
	desc: string;
	image: string;
	price: number;
	quantity: number;
};

const TestJWTPage = () => {
	const [user, setUser] = useState(null);
	const [unAthorized, setUnAuthorized] = useState(false);
	const [createProduct, { data }] =
		useCreateProductMutation();
	const [deleteProduct, { isLoading: isDeleting }] =
		useDeleteProductMutation();
	const accessToken = useAppSelector(selectAccessToken);
	const dispatch = useAppDispatch();
	const [updateProduct,{error}] = useUpdateProductMutation();

	const productBody: ProductPostType = {
		name: "Product Create by using RTK",
		price: 100,
		desc: "This is product 1 creat by using RTK",
		quantity: 10,
		category: {
			name: "Category 1",
			icon: "icon1",
		},
		image: "https://via.placeholder.com/150",
	};

	const handleCreateProductWithRTK = async () => {
		// ==| Inline error handling |==
		// try {
		//  const res = await createProduct(productBody).unwrap();
		//  console.log(res);
		// } catch (error) {
		//  console.log(error);
		// }

		// ==| Error handling with the useCreateProductMutation hook |==
		createProduct({
			newProduct: productBody,
		});
	};


	const handleLogin = async () => {
		const email = "yithsopheaktra18@gmail.com";
		const password = "istad123";
		fetch(
			process.env.NEXT_PUBLIC_BASE_URL_LOCALHOST + "login/",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email, password }),
			}
		)
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				if (data.accessToken) {
					dispatch(setAccessToken(data.accessToken));
					setUser(data.user);
				}
			})
			.catch((error) => {
				console.error("Login error:", error);
			});

	};

	const handleUpdate = async () => {
		const body = {
			name: "Product Update",
		};
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_BASE_URL}products/${542}/`,
			{
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${accessToken}`,
				},
				body: JSON.stringify(body),
			}
		);
		const data = await res.json();
		console.log("Updated", data);
		if (res.status === 401) {
			setUnAuthorized(true);
		}
	};

	const handleRefreshToken = async () => {
		fetch(process.env.NEXT_PUBLIC_BASE_URL_LOCALHOST + "refresh/", {
			method: "POST",
			credentials: "include",
			body: JSON.stringify({}),
		})
			.then((res) => res.json())
			.then((data) => {
				dispatch(setAccessToken(data.accessToken));
				console.log("Response When Refresh Token", data);
			})
			.catch((error) => {
				console.error("Refresh Token error:", error);
			});
	};

	const handleLogout = async () => {
		fetch(process.env.NEXT_PUBLIC_BASE_URL_LOCALHOST + "/logout", {
			method: "POST",
			credentials: "include",
			body: JSON.stringify({}),
		})
			.then((res) => res.json())
			.then((data) => {
				console.log("Response data from logout", data);
			})
			.catch((error) => {
				console.error("Refresh Token error:", error);
			});

		setAccessToken("");
	};

	// handle update product by id with rtk query
	const handleUpdateWithRTK = async () => {
		updateProduct({
			id: 542,
			updatedProduct: {
				name: "casual wardrobe update5",
			},
		});
	};


	return (
		<main className="h-screen grid place-content-center">
			<h1 className="text-4xl font-bold text-center">Test JWT</h1>
			<button
				className="my-4 px-10 py-3 bg-blue-600 rounded-xl text-gray-100 text-3xl"
				onClick={handleLogin}>
				Login
			</button>
			<button
				className="my-4 px-10 py-3 bg-blue-600 rounded-xl text-gray-100 text-3xl"
				onClick={handleCreateProductWithRTK}>
				Create Product with RTK
			</button>
			<button
				className="my-4 px-10 py-3 bg-blue-600 rounded-xl text-gray-100 text-3xl"
				onClick={handleUpdate}>
				Update
			</button>
			<button
				className="my-4 px-10 py-3 bg-blue-600 rounded-xl text-gray-100 text-3xl"
				onClick={handleUpdateWithRTK}>
				Update with RTK
			</button>
			<button
				className="my-4 px-10 py-3 bg-blue-600 rounded-xl text-gray-100 text-3xl"
				onClick={() => {
					deleteProduct({
						id: 570,
					});
				}}>
				Delete Product
			</button>
			{unAthorized && (
				<button
					onClick={handleRefreshToken}
					className="my-4 p-4 bg-blue-600 rounded-xl text-3xl text-gray-100">
					Refresh
				</button>
			)}

			<button
				className="my-4 px-10 py-3 bg-red-600 rounded-xl text-gray-100 text-3xl"
				onClick={handleLogout}>
				Logout
			</button>
		</main>
	);
};

export default TestJWTPage;


