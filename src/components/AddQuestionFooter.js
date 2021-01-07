import React, { Component } from 'react'
import {Button} from "antd";
export default class AddQuestionFooter extends Component {
    render() {
        return (
            <div className="row">
          <div className="col-12 col-sm-2 offset-sm-7">
            <Button block
              onClick={() => {
                this.props.handleCancel();
              }}
              style={{marginTop: 7}}
            >
              Cancel
            </Button>
          </div>
          <div className="col-12 col-sm-3 ">
            <Button block
              onClick={() => {
                this.props.handleOk();
              }}
              type="primary"
              style={{marginTop: 7}}
            >
              {this.props.type}
            </Button>
          </div>
        </div>
        )
    }
}
