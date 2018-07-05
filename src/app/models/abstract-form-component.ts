import { Router } from "@angular/router";

export abstract class AbstractFormComponent {
    /** Disables all inputs (todo: not implemented) */
    disabled: boolean;
    /** Determines if the Contiue button is disabled */
    abstract canContinue(): boolean;
    /** What happens when the user clicks the continue button. Generally navigating to another page. */
    abstract continue(): void;


    router: Router;
    constructor(router: Router){
        this.router = router;
    }
    /** Navigates to a route then automatically scrolls to the top of the page. */
    navigate(url: string){
        this.router.navigate([url])
        .then((data) => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        })
    }
}
