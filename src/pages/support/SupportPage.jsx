import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";
import FloatingNav from "../../components/common/FloatingNav";
import "../../styles/pages/support/SupportPage.scss";

const SupportPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header />

      <div className="support-page">
        <div className="support-header">
          <h1>고객센터</h1>
          <p>자주 찾는 질문과 안내를 빠르게 찾아보세요.</p>
        </div>

        <div className="support-container inner">
          <section className="support-actions">
            <div className="action-cards">
              <button className="action-card" onClick={() => navigate("/support/faq")}>
                <h3>자주 찾는 질문 (FAQ)</h3>
                <p>자주 묻는 질문을 확인하세요.</p>
              </button>

              <button className="action-card" onClick={() => navigate("/support/notices")}>
                <h3>공지사항</h3>
                <p>최근 공지사항을 확인하세요.</p>
              </button>

              <button className="action-card" onClick={() => navigate("/support/contact")}>
                <h3>1:1 문의</h3>
                <p>직접 문의하고 답변을 받아보세요.</p>
              </button>
            </div>
          </section>
        </div>
      </div>

      <Footer />

      <FloatingNav />
    </>
  );
};

export default SupportPage;
