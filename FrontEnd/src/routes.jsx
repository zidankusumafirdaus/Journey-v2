import "./style/index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./utils/QueryClient";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import MePage from "./pages/client/MePage";
import QuestPage from "./pages/client/QuestPage";
import SNotePage from "./pages/client/SNotePage";
import SNoteDetailPage from "./pages/client/SNoteDetailPage";
import LoginPage from "./pages/admin/LoginPage";
import AdminPage from "./pages/admin/AdminPage";
import { PrivateRoute } from "./utils/PrivateRoute";
import NotFound from "./pages/error/404";
import Error500 from "./pages/error/500";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          {/* Client Page */}
          <Route path="/" element={<Navigate to="/me" replace />} />
          <Route path="/me" element={<MePage />} />
          <Route path="/quest" element={<QuestPage />} />
          <Route path="/snot" element={<SNotePage />} />
          <Route path="/snot/:id" element={<SNoteDetailPage />} />

          {/* Admin Page */}
          <Route path="/admin" element={<PrivateRoute> <AdminPage /> </PrivateRoute>}/>
          <Route path="/login" element={<LoginPage />} />

          {/* Error Handlers */}
          <Route path="*" element={<NotFound />} />
          <Route path="/500" element={<Error500 />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  </React.StrictMode>
);