import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { PagePath } from "../constants/page-path.constant";
import { Layout } from "./layout.component";
import App from "../../App";
import { HomePage } from "./pages/home-page/home-page.component";
import { CategoryPage } from "./pages/category-page/category-page.component";
import { ProductDetailPage } from "./pages/product-detail/product-detail.component";
import { LoginPage } from "./pages/login-page/login-page.component";
import { SignupPage } from "./pages/signup-page/signup-page.component";
import { CollectionDetailPage } from "./pages/collection-detail-page/collection-detail-page.component";
import { createSignalRContext } from "react-signalr";
import { RequireAuth } from "./auth.component";
import { EventName, WebSocketEventStore } from "../socket/socket";

export let navigation: any = "";

export const SignalRContext = createSignalRContext();
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJmZDQ0NWRjNy1iZThlLTRkOWMtYTlmNi0xZmE4NmMwYzdiN2EiLCJ1c2VybmFtZSI6InRlc3RAZ21haWwuY29tIiwibmFtZSI6ImEiLCJwaG9uZSI6ImEiLCJyb2xlIjoidXNlciIsIm5iZiI6MTcxODM3ODQwNywiZXhwIjoxNzE4ODEwNDA3LCJpYXQiOjE3MTgzNzg0MDcsImlzcyI6ImFiYyIsImF1ZCI6ImFjY2VzcyJ9.l-72JmhR2CmnRs1rByvBaJQKS4mtqYMK6I1nAlRsq88";

export const Browser = () => {
  const nav = useNavigate();
  navigation = nav;

  SignalRContext.useSignalREffect(
    EventName.ReceiveMessage, // Your Event Key
    (message) => {
      WebSocketEventStore.emit(EventName.ReceiveMessage, message);
    },
    []
  );

  return (
    <SignalRContext.Provider
      connectEnabled={true}
      accessTokenFactory={() => token}
      dependencies={[token]}
      //remove previous connection and create a new connection if changed
      url={"https://localhost:7042/chathub"}
    >
      <div className="font-montserrat">
        <Routes>
          <Route path={PagePath.Login} Component={LoginPage} />
          <Route path={PagePath.Signup} Component={SignupPage} />

          <Route element={<Layout />}>
            <Route path={PagePath.Home} Component={HomePage} />

            <Route path={PagePath.Category + "/:id"} Component={CategoryPage} />

            <Route
              path={PagePath.ProductDetail + "/:id"}
              Component={ProductDetailPage}
            />

            <Route
              path={PagePath.Collection + "/:id"}
              Component={CollectionDetailPage}
            />

            <Route Component={RequireAuth}>
              <Route path={PagePath.Account} Component={() => <div>a</div>} />
            </Route>
          </Route>
        </Routes>
      </div>
    </SignalRContext.Provider>
  );
};
