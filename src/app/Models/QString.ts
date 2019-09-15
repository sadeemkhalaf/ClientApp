import { CandidateFilter } from './candidate';

export class QString {
    private qString: Array<CandidateFilter> = [];

    setQStringArray(qstring: Array<CandidateFilter>) {
        this.qString = qstring;
    }

    getQStringArray(): Array<CandidateFilter> {
        return this.qString;
    }

    resetQStringArray() {
        this.qString = [];
    }

    pushToQString(candidateFilter: CandidateFilter) {
        this.qString.push(candidateFilter);
    }

}
