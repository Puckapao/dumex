import React, { Component } from 'react';
import { connect } from 'react-redux';
import isEmail from 'validator/lib/isEmail';
import isEmpty from 'validator/lib/isEmpty';
import isLength from 'validator/lib/isLength';

import { inputMumNameAction } from '../../actions';

class InputMumName extends Component {
    state = {
        firstname: '',
        lastname: '',
        phone: '',
        email: '',
        is_call: true,
        error: {},
    };

    handleChange = e => {
        if (e.target.type === 'checkbox') {
            return this.setState({ [e.target.name]: e.target.checked });
        }
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmitForm = e => {
        e.preventDefault();

        // form validation

        let error = {};

        if (isEmpty(this.state.firstname)) {
            error.firstname = 'กรุณากรอกชื่อ';
        }
        if (isEmpty(this.state.lastname)) {
            error.lastname = 'กรุณากรอกนามสกุล';
        }
        if (!isLength(this.state.phone, { min: 8, max: 10 })) {
            error.phone = 'เลขโทรศัพท์ควรอยู่ระหว่าง 9-10 ตัว';
        }
        if (!isEmail(this.state.email)) {
            error.email = 'อีเมลล์ไม่ถูกต้อง';
        }

        // send to redux

        if (Object.keys(error).length === 0) {
            this.props.inputMumNameAction(this.state);
        } else {
            this.setState({ error });
        }
    };

    render() {
        return (
            <React.Fragment>
                {/* <h1>ทดสอบความเสี่ยงภูมิแพ้ของลูกน้อย</h1>
            <h1>รู้เร็ว รู้ง่าย เพียง1นาที</h1>
            <p>กรุณากรอกข้อมูลของท่าน</p>
            <TextInput
               name="firstname"
               value={this.state.firstname}
               onChange={this.handleChange}
            >
               ชื่อ
            </TextInput>
            {this.state.error.firstname || null}

            <TextInput
               name="lastname"
               value={this.state.lastname}
               onChange={this.handleChange}
            >
               นามสกุล
            </TextInput>
            {this.state.error.lastname || null}

            <TextInput
               name="phone"
               value={this.state.phone}
               onChange={this.handleChange}
            >
               เบอร์โทร
            </TextInput>
            {this.state.error.phone || null}

            <TextInput
               name="email"
               value={this.state.email}
               onChange={this.handleChange}
            >
               อีเมลล์
            </TextInput>
            {this.state.error.email || null}

            <Button onClick={this.handleSubmitForm}>
               เริ่มต้นทำแบบประเมิน
            </Button> */}
                <h1 className="header responsive">
                    <span>ทดสอบความเสี่ยง</span> <strong>ภูมิแพ้</strong>{' '}
                    <span>ของลูกน้อย</span>
                    <br />
                    <span>รู้เร็ว รู้ง่าย เพียง 1 นาที</span>
                </h1>
                <h2 className="sub-header">กรุณากรอกข้อมูลของคุณ</h2>
                <p>
                    <span className="input-wrapper req">
                        <input
                            className="input input_type_text"
                            required
                            type="text"
                            name="firstname"
                            value={this.state.firstname}
                            onChange={this.handleChange}
                            placeholder="ชื่อ"
                        />
                    </span>
                    </p>
                    <p>
                    <span className="input-wrapper req">
                        <input
                            className="input input_type_text"
                            required
                            type="text"
                            name="lastname"
                            value={this.state.lastname}
                            onChange={this.handleChange}
                            placeholder="นามสกุล"
                        />
                    </span>
                </p>
                <p>
                    <span className="input-wrapper req">
                        <input
                            className="input input_type_text"
                            required
                            type="text"
                            name="phone"
                            value={this.state.phone}
                            onChange={this.handleChange}
                            placeholder="เบอร์โทร"
                        />
                    </span>
                    </p>
                    <p>
                    <span className="input-wrapper req">
                        <input
                            className="input input_type_text"
                            required
                            type="text"
                            name="email"
                            value={this.state.email}
                            onChange={this.handleChange}
                            placeholder="อีเมล์"
                        />
                    </span>
                </p>
                <p className="align-left">
                    <span className="input-wrapper">
                        <label>
                            <input
                                className="input input_type_checkbox"
                                type="checkbox"
                                name="is_call"
                                value={this.state.is_call}
                                onChange={this.handleChange}
                                checked={this.state.is_call}
                            />
                            <span className="checkbox-icon" />{' '}
                            โดยการส่งแบบฟอร์มนี้ ข้าพเจ้ายินยอมให้บริษัท ดูเม็กซ์ จำกัด และ/หรือ Nutricia Expert จัดเก็บข้อมูลและดำเนินการกับข้อมูลส่วนบุคคลของข้าพเจ้าตามนโยบายความเป็นส่วนตัวของข้อมูลส่วนบุคคล และติดต่อกลับหาข้าพเจ้าเพื่อขอข้อมูลเพิ่มเติมเกี่ยวกับแบบฟอร์มนี้ 
                        </label>
                    </span>
                </p>
                <p>
                    {this.state.error.firstname && (
                        <div class="error-p">{this.state.error.firstname}</div>
                    )}
                    {this.state.error.lastname && (
                        <div class="error-p">{this.state.error.lastname}</div>
                    )}
                    {this.state.error.phone && (
                        <div class="error-p">{this.state.error.phone}</div>
                    )}
                    {this.state.error.email && (
                        <div class="error-p">{this.state.error.email}</div>
                    )}
                </p>
                <p>
                    <button
                        className="button button_solid"
                        onClick={this.handleSubmitForm}
                    >
                        เริ่มต้นทำแบบประเมิน
                    </button>
                </p>
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
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return { form: state.form };
};

export default connect(
    mapStateToProps,
    { inputMumNameAction }
)(InputMumName);
