import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {QBlock} from '../../models';
import {AbstractControl, FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RowQblock} from '../../pages/admin/ecoe/questions/questions.component';
import {QuestionsService} from '../../services/questions/questions.service';

@Component({
  selector: 'app-qblock-question-form',
  templateUrl: './qblock-question-form.component.html',
  styleUrls: ['./qblock-question-form.component.less']
})
export class QblockQuestionFormComponent implements OnInit {

  @Input() id_station: number;
  @Input() n_qblocks: number;

  @Output() saved: EventEmitter<boolean> = new EventEmitter();

  @ViewChild('question') questionRef;
  @ViewChild('qblock') qblockRef;

  private current = 0;

  private qblocksToAdd: QBlock[] = [];
  private questionsToAdd: any[] = [];

  private qblockForm: FormGroup;
  private control: FormArray;

  private rowQblock: RowQblock = {
    name: ['', Validators.required]
  };

  constructor(private fb?: FormBuilder,
              private questionService?: QuestionsService) { }

  ngOnInit() {
    this.qblockForm = this.fb.group({
      qblockRow: this.fb.array([])
    });

    this.control = <FormArray>this.qblockForm.controls.qblockRow;

    this.InitQblockRow();
  }

  /**
   * Before save values in data base, in first time checks that
   * all fields are validates and then will save the values.
   */
  submitForm() {
    if (this.getCurrent() !== 2) {
      if (!this.validQuestions()) { return new Promise((resolve, reject) => reject(false)); }
    }
    return this.questionService.saveArrayQblocks(this.qblocksToAdd, this.id_station, this.n_qblocks)
      .catch((err) => new Promise((resolve, reject) => reject(err)) )
      .then(result => this.questionService.addQuestions(this.questionsToAdd, result[0].id) );
  }

  pre(): void {
    this.current -= 1;
  }

  next(): void {
    this.current += 1;
  }

  getCurrent() {
    return this.current;
  }

  resetCurrent() {
    this.current = 0;
  }

  save() {
    this.submitForm()
      .then( () => {
        this.saved.next(true);
        this.resetForm();
      })
      .catch((e) => console.warn(e));
  }

  resetForm() {
    this.resetCurrent();
    this.qblocksToAdd = [];
    this.questionsToAdd = [];
  }

  validQblocks() {
    let valid = false;
    if (this.qblockRef.submitForm()) {
      this.next();
      valid = true;
    }
    return valid;
  }

  preview() {
    if (this.validQuestions()) {
      this.current++;
    }
  }

  validQuestions() {
    let valid = false;
    if (this.questionRef.submitForm()) {
      valid = true;
    }
    return valid;
  }

  onGetQblocks(data: QBlock[]) {
    this.qblocksToAdd = data;
  }

  onGetQuestions(data: any[]) {
    this.questionsToAdd = data;
  }

  /**
   * When user decides do not save the form values and
   * close the form window: will close the drawer window
   * and reset the number of row qblocks.
   */
  cancelForm() {
    this.closeDrawer();
    this.InitQblockRow();
  }

  /**
   * Closes the form qblock window
   */
  closeDrawer() {
    this.saved.next(false);
    this.resetForm();
  }

  /**
   *At first time when OnInit, adds new qblock row;
   * in other cases resets the number of rows to 1 when the
   * form window was closed.
   */
  InitQblockRow() {
    if (this.control.length === 0) {
      this.addQblockRow();
    } else {
      while (this.control.length > 1) {
        this.control.removeAt(1);
      }
      this.control.reset();
    }
  }

  /**
   * Adds new row (name field) qblock to the form
   */
  addQblockRow() {
    this.control.push(this.fb.group(this.rowQblock));
  }

  /**
   * Obtains de formControl instance of any element in our form.
   * @param name of the field, in our case can be 'name' or 'code'
   * @param idx the index of the field.
   */
  getFormControl(name: string, idx: number): AbstractControl {
    return this.qblockForm.get('qblockRow')['controls'][idx].controls[name];
  }

  /**
   * Deletes selected row qblock whose was added previously
   * @param index id field to find and remove.
   */
  deleteRow(index) {
    this.control.removeAt(index);
  }
}