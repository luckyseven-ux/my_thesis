import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import TestRecordPage from "./pages/TestRecordPage";
import axios from "axios"


jest.mock("axios");

describe("TestRecordPage", () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    localStorage.setItem("token", "test-token");
  });

  afterEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  const renderComponent = () =>
    render(
      <Router>
        <TestRecordPage />
      </Router>
    );

  test("mengalihkan ke login jika tidak terautentikasi", () => {
    localStorage.removeItem("token");
    renderComponent();
    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });

  test("merender formulir dengan benar", () => {
    renderComponent();
    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Pregnancies/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Glucose/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Blood Pressure/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Skin Thickness/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Insulin/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/BMI/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Diabetes Pedigree Function/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Age/i)).toBeInTheDocument();
  });

  test("menangani perubahan input", () => {
    renderComponent();
    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: "Nama Tes" } });
    expect(screen.getByLabelText(/Name/i).value).toBe("Nama Tes");
  });

  test("mengirim formulir dengan sukses", async () => {
    axios.post.mockResolvedValue({ data: { probability: 75 } });
    renderComponent();
    
    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: "Nama Tes" } });
    fireEvent.change(screen.getByLabelText(/Pregnancies/i), { target: { value: "2" } });
    fireEvent.change(screen.getByLabelText(/Glucose/i), { target: { value: "120" } });
    fireEvent.change(screen.getByLabelText(/Blood Pressure/i), { target: { value: "70" } });
    fireEvent.change(screen.getByLabelText(/Skin Thickness/i), { target: { value: "20" } });
    fireEvent.change(screen.getByLabelText(/Insulin/i), { target: { value: "80" } });
    fireEvent.change(screen.getByLabelText(/BMI/i), { target: { value: "24.5" } });
    fireEvent.change(screen.getByLabelText(/Diabetes Pedigree Function/i), { target: { value: "0.5" } });
    fireEvent.change(screen.getByLabelText(/Age/i), { target: { value: "25" } });

    fireEvent.submit(screen.getByRole("button", { name: /Save Record/i }));

    await waitFor(() => {
      expect(screen.getByText(/Prediction Result: 75%/i)).toBeInTheDocument();
    });
  });

  test("menangani kesalahan pengiriman formulir", async () => {
    axios.post.mockRejectedValue({
      response: { data: { errors: { glucose: "Nilai glukosa tidak valid" } } },
    });
    renderComponent();

    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: "Nama Tes" } });
    fireEvent.submit(screen.getByRole("button", { name: /Save Record/i }));

    await waitFor(() => {
      expect(screen.getByText(/Nilai glukosa tidak valid/i)).toBeInTheDocument();
    });
  });

  test("menangani event beforeunload", () => {
    window.dispatchEvent(new Event("beforeunload"));
    expect(localStorage.getItem("token")).toBeNull();
    expect(localStorage.getItem("authType")).toBeNull();
  });
});
