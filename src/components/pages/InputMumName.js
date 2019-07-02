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
        is_call: false,
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
                <div className="input-row">
                    <span className="input-wrapper req input-stack">
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
                    <span className="input-wrapper req input-stack">
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
                </div>
                <div style={{ clear: 'both' }} />
                <div className="input-row">
                    <span className="input-wrapper req input-stack">
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
                    <span className="input-wrapper req input-stack">
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
                </div>
                <div style={{ clear: 'both' }} />
                <div className="input-row">
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
                            ข้าพเจ้ายินดีให้ผู้เชี่ยวชาญติดต่อกลับ
                        </label>
                    </span>
                </div>
                <div style={{ clear: 'both' }} />
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
