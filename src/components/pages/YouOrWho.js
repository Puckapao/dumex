import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeStepAction, youOrWhoAction } from '../../actions';

class YouOrWho extends Component {
    changeStep = (newStep, newMember) => {
        if (newMember !== null) {
            this.props.youOrWhoAction(newMember, this.props.Member);
        }
        this.props.changeStepAction(newStep);
    };

    render() {
        return (
            <React.Fragment>
                <p className="backButton">
                    <button
                        className="button button_solid backButton_small"
                        onClick={this.changeStep.bind(this, '1', false)}
                    >
                        กลับ
                    </button>
                </p>
                {/* <h1>ทดสอบความเสี่ยงภูมิแพ้ของลูกน้อย</h1>
            <h1>รู้เร็ว รู้ง่าย เพียง1นาที</h1>
            <p>สวัสดีคุณ {this.props.Member.firstname || ""}</p>
            <p>
               Lorem ipsum dolor, sit amet consectetur adipisicing elit.
               Quisquam natus quo iure cumque repellendus nihil minima impedit
               enim explicabo nam. Consequatur quia sit commodi magni eaque
               similique obcaecati dolores excepturi.
            </p>
            <Button onClick={this.changeStep.bind(this, "4", true)}>
               คุณไม่ใช่บุคคลที่กล่าวถึง?
            </Button>
            <Button onClick={this.changeStep.bind(this, "3", false)}>
               เริ่มต้นทำแบบประเมิน
            </Button> */}
                <h1 className="header">
                    ทดสอบความเสี่ยง <strong>ภูมิแพ้</strong> ของลูกน้อย
                    <br />
                    รู้เร็ว รู้ง่าย เพียง 1 นาที
                </h1>
                <h2 className="sub-header">
                    สวัสดีคุณ {this.props.Member.firstname || ''}
                </h2>
                <div className="page-content you-or-who-content">
                    <p>
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
                        <br />
                        <br />
                        คำชี้แจง : แบบประเมินความเสี่ยงโรคภูมิแพ้นี้
                        เป็นเครื่องมือที่ออกแบบสำหรับการประเมินความเสี่ยงเบื้องต้น
                        ซึ่งประเมินจากประวัติโรคภูมิแพ้ของ พ่อ แม่และพี่
                        เป็นหลัก
                        เพื่อให้ผู้ปกครองใช้เป็นแนวทางในการป้องกันโรคภูมิแพ้ของลูกน้อย
                        แบบสอบถามได้ถูกพัฒนาขึ้นจากงานวิจัยทางการแพทย์ที่เชื่อถือได้
                        โปรดปรึกษาบุคลาการทางการแพทย์เพื่อการวินิจฉัยเพิ่มเติม
                    </p>
                    <p>
                        <a
                            href="#"
                            onClick={this.changeStep.bind(this, '4', true)}
                        >
                            คุณไม่ใช่บุคคลที่กล่าวถึง?
                        </a>
                    </p>
                </div>
                <p>
                    <button
                        className="button button_solid"
                        onClick={this.changeStep.bind(this, '3', false)}
                    >
                        เริ่มต้นทำแบบประเมิน
                    </button>
                </p>
                <div className="form-step">
                    <a
                        className="form-step__nav form-step__nav_prev"
                        href="#"
                        onClick={this.changeStep.bind(this, '1', null)}
                    >
                        กลับ
                    </a>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return { Member: state.form.Member };
};

export default connect(
    mapStateToProps,
    { changeStepAction, youOrWhoAction }
)(YouOrWho);
