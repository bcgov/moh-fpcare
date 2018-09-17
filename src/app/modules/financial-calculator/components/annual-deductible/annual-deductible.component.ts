import { ChangeDetectionStrategy, Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { FinanceService } from '../../finance.service';
import { PharmaCareAssistanceLevel } from '../../assistance-levels.interface';
import {debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Base } from '../../../../models/base.alias';
import { growVertical } from '../../../../animations/animations';
import {BehaviorSubject} from 'rxjs/internal/BehaviorSubject';

@Component({
  selector: 'fpcare-annual-deductible',
  templateUrl: './annual-deductible.component.html',
  styleUrls: ['./annual-deductible.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [growVertical]
})
export class AnnualDeductibleComponent extends Base implements OnInit {
  /** A number of the user's family net income, used to lookup PharmaCare assistance levels */
  @Input() familyNetIncome: number;
  /** Used to load different PharmaCare assistance level values */
  @Input() bornBefore1939: boolean;

  /** The main data object, retrieved via lookup using familyNetIncome. Used in calclations. */
  public pharmaCareLevel: PharmaCareAssistanceLevel;
  /** Currency formatted dollar amount */
  public deductible: string = null;
  /** A percentage value (without the % symbol) of the portion PharmaCare pays after deductible is met  */
  public pharmaCarePortion: number;
  /** A currency formatted dollar amount of the max */
  public maximum: string = null;

  /** Percentage width of deductible portion of progress bar */
  public deductibleRatio = 0;
  /** Percentage width of partial PharmaCare portion of progress bar */
  public pharmaCareRatio = 0;
  /** Percentage width of maximum payment portion of progress bar */
  public maximumRatio = 100;

  /**
   * We use rxjs for performance benefits to reduce the calls to re-animating
   * the progress bar only when it needs it.
   */
  private progressBarChange = new BehaviorSubject(null );

  constructor(private financeService: FinanceService, private cdref: ChangeDetectorRef) {
    super();
  }

  ngOnInit() {
    // Setup progress bar UI update listener
    this.progressBarChange
      .pipe(
        distinctUntilChanged(),
        debounceTime(200),
      )
      .subscribe(_ => {

        // * Idea - Instead of checking each time for this, we could just setup
        // * progressBarChange to have a delayUntil on financeService.hasData
        if (!this.pharmaCareLevel){
          return;
        }

        this.updateProgressBar();
        // Since we use debounceTime(), updates can happen after Angular change
        // detection is done, so we have to manually invoke it.
        this.cdref.detectChanges();
      });
  }

  ngOnDestroy(){
    this.progressBarChange.unsubscribe();
  }

  ngOnChanges(changes) {
    //console.log('Annual deductible ngOnChanges', changes);

    this.pharmaCareLevel = this.financeService.findAssistanceLevel(this.familyNetIncome, {bornBefore1939: this.bornBefore1939});

    // Cannot be _undefined
    if ( this.pharmaCareLevel ) {
      this.deductible = this.financeService.currencyFormat(this.pharmaCareLevel.deductible);
      this.maximum = this.financeService.currencyFormat(this.pharmaCareLevel.maximum);
      this.pharmaCarePortion = this.pharmaCareLevel.pharmaCarePortion;

      // Update the progress bar UI, if and only if necessary
      this.progressBarChange.next(this.pharmaCareLevel);
    }
  }

  private updateProgressBar() {
    // 100% green bar - PharmaCare pays everything
    if (this.pharmaCareLevel.maximum === 0) {
      this.maximumRatio = 100;
      this.deductibleRatio = 0;
      this.pharmaCareRatio = 0;
      return;
    }

    // 50% green / 50% yellow - no deductible bar
    if (this.pharmaCareLevel.deductible === 0) {
      this.deductibleRatio = 0;
      this.pharmaCareRatio = 50;
      this.maximumRatio = 50;
      return;
    }

    // Show all 3 bars - alignments match the text labels above the bar
    this.deductibleRatio = 30;
    this.pharmaCareRatio = 40;
    this.maximumRatio = 30;

    console.log('done updateProgressBar', {
      deductibleRatio: this.deductibleRatio,
      pharmaCareRatio: this.pharmaCareRatio,
      maximumRatio: this.maximumRatio,
      pharmaCareLevel: this.pharmaCareLevel
    });
  }



}
