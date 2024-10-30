import styles from "../css/Footer.module.css"

function Footer() {
    return (
        <div id={styles.container}>
            <div className={styles.innerContainer}>
                <div className={styles.companyName}>bixiv</div>
                <div className={styles.phone}>대표전화 : (032)123-0348 / FAX : (032)123-0354</div>
                <div className={styles.phoneDetail}>평일 10:00 - 18:00, 주말 휴무</div>
                <div className={styles.reader}>
                    대표 : 장병철 사업자등록번호 : 000-11-22222 통신판매 신고번호: 2024-인천부평-1234
                </div>
                <div className={styles.address}>
                    주소 : 14780 경기도 부천시 경인로 590 (괴안동 185-34)
                </div>
                <div className={styles.copyright}>Copyright(c) 2024 by hanju. All Rights Reserved.</div>
            </div>
        </div>
    );
}

export default Footer;