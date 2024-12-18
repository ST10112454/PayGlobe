import { useState } from "react";
import axios from 'axios';
import './App.css';

function Payment() {
    const [recipientName, setRecipientName] = useState("");
    const [recipientBank, setRecipientBank] = useState("");
    const [recipientAccount, setRecipientAccount] = useState("");
    const [amount, setAmount] = useState("");
    const [swiftCode, setSwiftCode] = useState("");
    const [error, setError] = useState("");

    // RegEx patterns for validation
    const nameRegex = /^[a-zA-Z\s]+$/;
    const bankRegex = /^[a-zA-Z\s]+$/;
    const accountNumberRegex = /^\d{10}$/;
    const swiftCodeRegex = /^[A-Z0-9]{8,11}$/;
    const amountRegex = /^\d+(\.\d{1,2})?$/;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!nameRegex.test(recipientName)) {
            setError("Invalid recipient name");
            return;
        }
        if (!bankRegex.test(recipientBank)) {
            setError("Invalid bank name");
            return;
        }
        if (!accountNumberRegex.test(recipientAccount)) {
            setError("Account number must be 10 digits");
            return;
        }
        if (!amountRegex.test(amount)) {
            setError("Invalid amount format");
            return;
        }
        if (!swiftCodeRegex.test(swiftCode)) {
            setError("Invalid SWIFT code");
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/payment', {
                recipientName,
                recipientBank,
                recipientAccount,
                amount,
                swiftCode
            });
            console.log(response.data);
            alert("Payment successful!");

            setRecipientName("");
            setRecipientBank("");
            setRecipientAccount("");
            setAmount("");
            setSwiftCode("");
            setError("");

        } catch (error) {
            console.error(error);
            setError("Payment failed. Please check the details.");
        }
    };

    return (
        <div className="payment-container">
            <div className="payment-form">
                <h2>International Payment Form</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label><strong>Recipient's Name</strong></label>
                        <input
                            type="text"
                            placeholder="Enter Recipient's Name"
                            value={recipientName}
                            onChange={(e) => setRecipientName(e.target.value)}
                            className="form-control"
                        />
                    </div>
                    <div className="mb-3">
                        <label><strong>Recipient's Bank</strong></label>
                        <input
                            type="text"
                            placeholder="Enter Recipient's Bank"
                            value={recipientBank}
                            onChange={(e) => setRecipientBank(e.target.value)}
                            className="form-control"
                        />
                    </div>
                    <div className="mb-3">
                        <label><strong>Recipient's Account Number</strong></label>
                        <input
                            type="text"
                            placeholder="Enter Recipient's Account Number"
                            value={recipientAccount}
                            onChange={(e) => setRecipientAccount(e.target.value)}
                            className="form-control"
                        />
                    </div>
                    <div className="mb-3">
                        <label><strong>Amount to transfer</strong></label>
                        <input
                            type="text"
                            placeholder="Enter Amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="form-control"
                        />
                    </div>
                    <div className="mb-3">
                        <label><strong>SWIFT Code</strong></label>
                        <input
                            type="text"
                            placeholder="Enter SWIFT Code"
                            value={swiftCode}
                            onChange={(e) => setSwiftCode(e.target.value)}
                            className="form-control"
                        />
                    </div>
                    {error && <p className="text-danger">{error}</p>}
                    <button type="submit" className="btn btn-success w-100">Pay Now</button>
                    <button type="button" className="btn btn-secondary w-100 mt-2">Cancel</button>
                </form>
            </div>
        </div>
    );
}

export default Payment;
