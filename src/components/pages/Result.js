import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeStepAction, resultAction } from '../../actions';

import lowRisk from '../../img/endcard-low.svg';
import highRisk from '../../img/endcard-high.svg';

class Result extends Component {
    changeStep = newStep => {
        this.props.changeStepAction(newStep);
    };

    componentDidMount() {
        this.props.resultAction(this.props.form);
    }

    renderResult = score => {
        if (score < 2)
            return (
                <React.Fragment>
                    <div className="result-box">
                        <img
                            src={lowRisk}
                            alt="low-risk"
                            width="360"
                            height="480"
                        />
                        <h2 className="result-box__header">
                            ลูกของคุณมี <strong>ความเสี่ยงต่ำ</strong>{' '}
                            ที่จะเกิดภูมิแพ้
                        </h2>
                    </div>
                    {/* <a href="#" className="result-share-button">
                  <span>Share</span>
               </a> */}
                    <div className="result-info">
                        <p>
                            ขอแสดงความยินดีกับคุณแม่ที่ลูกน้อยของคุณแม่มีความเสี่ยงในการเกิดโรค{' '}
                            <strong>ภูมิแพ้</strong> ตํ่า
                            อย่างไรก็ตามภูมิต้านทาน คือรากฐาน
                            สําคัญสําหรับสุขภาพในระยะยาว
                            ควรส่งเสริมภูมิต้านทานให้ลูกน้อยด้วยการให้นมแม่อย่างน้อย
                            6 เดือน
                        </p>
                    </div>
                    <div className="result-action">
                        <a
                            href="#"
                            className="result-action__button result-action__button_call"
                            onClick={this.changeStep.bind(this, '9')}
                        >
                            ยินดีให้ผู้เชี่ยวชาญติดต่อกลับ
                        </a>
                        <a
                            href="#"
                            className="result-action__button result-action__button_save"
                            onClick={this.changeStep.bind(this, '11')}
                        >
                            บันทึกผลเพื่อปรึกษาแพทย์
                        </a>
                    </div>
                </React.Fragment>
            );
        else
            return (
                <React.Fragment>
                    <div className="result-box">
                        <img
                            src={highRisk}
                            alt="high-risk"
                            width="360"
                            height="480"
                        />
                        <h2 className="result-box__header">
                            ลูกของคุณมี <strong>ความเสี่ยงสูง</strong>{' '}
                            ที่จะเกิดภูมิแพ้
                        </h2>
                    </div>
                    {/* <a href="#" className="result-share-button">
                  <span>Share</span>
               </a> */}
                    <div className="result-info">
                        <p>
                            โรค <strong>ภูมิแพ้</strong> สามารถถ่ายทอดผ่านทางพันธุกรรมได้ ซึ่งน้องมีความเสี่ยงที่อาจจะเกิดโรค <strong>ภูมิแพ้</strong> ในอนาคต คุณแม่ควรเลี้ยงลูกด้วยนมแม่ให้นานที่สุด หรืออย่างน้อย 6 เดือน ในกรณีที่ไม่สามารถให้นมแม่ได้ ควรปรึกษาบุคลากรทางการแพทย์เกี่ยวกับนมสูตร pHF หรือ H.A. ที่มีโปรตีนขนาดเล็ก ซึ่งช่วยลดการกระตุ้นการเกิด <strong>ภูมิแพ้</strong>
                        </p>
                        <h4>
                            "เปลี่ยนภูมิแพ้... เป็นภูมิพร้อม" ตั้งแต่วันนี้
                            เพราะอนาคตเป็นของคนที่พร้อม
                        </h4>
                        <p>
                            ให้ลูกน้อยมีภูมิต้านทานที่แข็งแรง ไม่เสี่ยงต่อ{' '}
                            <strong>ภูมิแพ้</strong>{' '}
                            เรียนรู้โลกอย่างกว้างอย่างไร้อุปสรรค
                            เพราะอนาคตเป็นของคนที่พร้อม
                            สอบถามเรื่องนมเพื่อลดความเสี่ยงอาการภูมิแพ้ได้ที่{' '}
                            <strong>02-740-3456</strong>
                        </p>
                        <br />
                        <br />
                        <p>
                            ควรปรึกษาแพทย์ เพื่อการวินิจฉัยอย่างถูกต้อง
                            และการเลือกโภชนาการที่เหมาะสม
                        </p>
                        <br />
                        <br />
                    </div>
                    <div className="result-action">
                        <a
                            href="#"
                            className="result-action__button result-action__button_call"
                            onClick={this.changeStep.bind(this, '9')}
                        >
                            ยินดีให้ผู้เชี่ยวชาญติดต่อกลับ
                        </a>
                        <a
                            href="#"
                            className="result-action__button result-action__button_save"
                            onClick={this.changeStep.bind(this, '11')}
                        >
                            บันทึกผลเพื่อปรึกษาแพทย์
                        </a>
                    </div>
                </React.Fragment>
            );
    };

    calcScore = AllergyPrevention => {
        let score = [];
        Object.keys(AllergyPrevention).forEach((key, index) => {
            if (index < 4) {
                // main mother
                if (AllergyPrevention[key] === 'yes') {
                    score.push(3);
                } else if (AllergyPrevention[key] === 'not-sure') {
                    score.push(2);
                } else {
                    score.push(0);
                }
            } else if (index < 8) {
                // second mother
                if (AllergyPrevention[key] === 'yes') {
                    score.push(1);
                } else if (AllergyPrevention[key] === 'not-sure') {
                    score.push(0.5);
                } else {
                    score.push(0);
                }
            } else if (index < 12) {
                // main father
                if (AllergyPrevention[key] === 'yes') {
                    score.push(2);
                } else if (AllergyPrevention[key] === 'not-sure') {
                    score.push(1);
                } else {
                    score.push(0);
                }
            } else if (index < 16) {
                // second father
                if (AllergyPrevention[key] === 'yes') {
                    score.push(1);
                } else if (AllergyPrevention[key] === 'not-sure') {
                    score.push(0.5);
                } else {
                    score.push(0);
                }
            } else if (index < 20) {
                // main brother
                if (AllergyPrevention[key] === 'yes') {
                    score.push(2);
                } else if (AllergyPrevention[key] === 'not-sure') {
                    score.push(1);
                } else {
                    score.push(0);
                }
            } else {
                // second brother
                if (AllergyPrevention[key] === 'yes') {
                    score.push(1);
                } else if (AllergyPrevention[key] === 'not-sure') {
                    score.push(0.5);
                } else {
                    score.push(0);
                }
            }
        });

        const maxScore = {
            mother: {
                main: 0,
                second: 0,
            },
            father: {
                main: 0,
                second: 0,
            },
            brother: {
                main: 0,
                second: 0,
            },
        };

        maxScore.mother.main = Math.max.apply(null, score.slice(0, 4));
        maxScore.mother.second = Math.max.apply(null, score.slice(4, 8));
        maxScore.father.main = Math.max.apply(null, score.slice(8, 12));
        maxScore.father.second = Math.max.apply(null, score.slice(12, 16));
        maxScore.brother.main = Math.max.apply(null, score.slice(16, 20));
        maxScore.brother.second = Math.max.apply(null, score.slice(20, 24));

        return (
            maxScore.mother.main +
            maxScore.mother.second +
            maxScore.father.main +
            maxScore.father.second +
            maxScore.brother.main +
            maxScore.brother.second
        );
    };

    backStep = () => {
        this.props.changeStepAction('7');
    };

    render() {
        return (
            <React.Fragment>
                <p className="backButton">
                    <button
                        className="button button_solid backButton_small"
                        onClick={this.backStep}
                    >
                        กลับ
                    </button>
                </p>
                {/* <h1>ผลทดสอบความเสี่ยงภูมิแพ้</h1>
            <Button onClick={this.changeStep.bind(this, "9")}>
               ขอคำปรึกษาจากผู้เชี่ยวชาญ
            </Button>
            <Button>บันทึกผลเพื่อปรึกษาแพทย์</Button>
            {this.renderResult(
               this.calcScore(this.props.form.AllergyPrevention)
            )}
            <Button>กลับ</Button> */}
                <h1 className="header">
                    ผลทดสอบความเสี่ยง <strong>ภูมิแพ้</strong>
                </h1>
                <div className="result-wrapper">
                    {this.renderResult(
                        this.calcScore(this.props.form.AllergyPrevention)
                    )}
                </div>
                <br />
                <br />
                <h2 className="sub-header">ข้อมูลนมแม่</h2>
                <p className="small-p">
                    นมแม่คือโภชนาการที่ดีที่สุดสำหรับทารกและให้ประโยชน์หลายด้านต่อทารกและมารดา
                    การรับประทานอาหารที่ดีต่อสุขภาพอย่างสมดุลของมารดาในช่วงก่อนและขณะให้นมลูกมีความสำคัญ
                    การเลี้ยงลูกด้วยนมแม่ร่วมกับนมขวดในช่วงสัปดาห์แรกๆ
                    หลังคลอดอาจทำให้ปริมาณน้ำนมแม่ลดลง
                    และทำให้การตัดสินใจกลับมาเลี้ยงลูกด้วยนมแม่ยากขึ้น
                    ควรคำนึงถึงผลกระทบด้านสังคมและเศรษฐกิจในการใช้นมดัดแปลงสำหรับทารก
                    การให้นมแก่ทารกอย่างไม่ถูกวิธี
                    หรือการให้อาหารทารกด้วยชนิดหรือวิธีการที่ไม่เหมาะสมอาจก่อให้เกิดอันตรายแก่สุขภาพได้
                    ในกรณีที่มารดาใช้นมดัดแปลงสำหรับทารก
                    ควรต้องปฏิบัติตามคำแนะนำในการใช้โดยผู้ผลิตอย่างเคร่งครัด
                    มิฉะนั้นอาจทำให้ทารกไม่สบายได้
                    มารดาควรปรึกษาบุคลากรทางการแพทย์
                    เพื่อขอคำแนะนำเรื่องโภชนาการสำหรับทารก
                </p>

                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                {/* <div className="form-step">
                    <div className="step">
                        <a href="#" className="step__item">
                            <span>1</span>
                        </a>
                        <a href="#" className="step__item">
                            <span>2</span>
                        </a>
                        <a href="#" className="step__item">
                            <span>3</span>
                        </a>
                        <a href="#" className="step__item">
                            <span>4</span>
                        </a>
                        <a href="#" className="step__item">
                            <span>5</span>
                        </a>
                        <a href="#" className="step__item">
                            <span>6</span>
                        </a>
                        <a href="#" className="step__item">
                            <span>7</span>
                        </a>
                        <a href="#" className="step__item current">
                            <span>8</span>
                        </a>
                    </div>
                    <a
                        className="form-step__nav form-step__nav_prev"
                        href="#"
                        onClick={this.backStep}
                    >
                        กลับ
                    </a>
                </div> */}
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return { form: state.form };
};

export default connect(
    mapStateToProps,
    { changeStepAction, resultAction }
)(Result);
