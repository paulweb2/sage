export interface ProgressItem {
  id: string;
  title: string;
  type: 'quiz' | 'reflection';
  completed: boolean;
  score?: number;
  lastCompleted?: string;
}

export interface ProgressData {
  totalItems: number;
  completedItems: number;
  percentage: number;
  items: ProgressItem[];
  lastUpdated: string;
}

export class ProgressService {
  private static readonly PROGRESS_KEY = 'sage-overall-progress';
  private static readonly DISABILITY_PAGES = [
    'physical-disabilities',
    'hearing-needs', 
    'physical-sensory-needs',
    'cognitive-intellectual-needs',
    'speech-language-needs',
    'communication',
    'multiple-disabilities',
    'signposting'
  ];

  // TEMPORARY: Currently implemented tasks for celebration trigger
  // TODO: Remove this when all tasks are implemented and use full progress instead
  private static readonly IMPLEMENTED_TASKS = [
    'hearing-needs-quiz',        // Hearing Needs Quiz
    'hearing-needs-reflection',  // Hearing Needs Reflection
    'hearing-needs-case-study',  // Hearing Needs Case Study note
    'communication-quiz',        // Communication Quiz
    'signposting-reflection'     // Signposting Reflection
  ];

  /**
   * Get overall progress across all disability pages
   */
  static getOverallProgress(): ProgressData {
    const items: ProgressItem[] = [];
    
    // Check each disability page for quiz and reflection completion
    this.DISABILITY_PAGES.forEach(pageId => {
      // Check quiz completion
      const quizCompleted = this.isQuizCompleted(pageId);
      const quizScore = this.getQuizScore(pageId);
      items.push({
        id: `${pageId}-quiz`,
        title: `${this.getPageTitle(pageId)} - Quiz`,
        type: 'quiz',
        completed: quizCompleted,
        score: quizScore,
        lastCompleted: quizCompleted ? this.getQuizLastCompleted(pageId) : undefined
      });

      // Check reflection completion
      const reflectionCompleted = this.isReflectionCompleted(pageId);
      items.push({
        id: `${pageId}-reflection`,
        title: `${this.getPageTitle(pageId)} - Reflection`,
        type: 'reflection',
        completed: reflectionCompleted,
        lastCompleted: reflectionCompleted ? this.getReflectionLastCompleted(pageId) : undefined
      });

      // Hearing Needs: add Case Study note as a separate tracked item
      if (pageId === 'hearing-needs') {
        const csCompleted = this.isCaseStudyCompleted(pageId);
        items.push({
          id: `${pageId}-case-study`,
          title: `${this.getPageTitle(pageId)} - Case Study`,
          type: 'reflection',
          completed: csCompleted,
          lastCompleted: csCompleted ? this.getCaseStudyLastCompleted(pageId) : undefined
        });
      }
    });

    const completedItems = items.filter(item => item.completed).length;
    const totalItems = items.length;
    
    // TEMPORARY: Calculate percentage based on implemented tasks only for celebration
    // TODO: Change this back to totalItems when all tasks are implemented
    const implementedCompletedItems = items.filter(item => 
      this.IMPLEMENTED_TASKS.includes(item.id) && item.completed
    ).length;
    const implementedTotalItems = this.IMPLEMENTED_TASKS.length;
    const celebrationPercentage = implementedTotalItems > 0 
      ? Math.round((implementedCompletedItems / implementedTotalItems) * 100) 
      : 0;

    return {
      totalItems,
      completedItems,
      percentage: celebrationPercentage, // Use implemented tasks percentage for celebration
      items,
      lastUpdated: new Date().toISOString()
    };
  }

  /**
   * Check if quiz is completed for a specific page
   */
  static isQuizCompleted(pageId: string): boolean {
    const quizData = localStorage.getItem(`sage-quiz-${pageId}`);
    if (!quizData) return false;
    
    try {
      const data = JSON.parse(quizData);
      return data.completed === true;
    } catch {
      return false;
    }
  }

  /**
   * Get quiz score for a specific page
   */
  static getQuizScore(pageId: string): number | undefined {
    const quizData = localStorage.getItem(`sage-quiz-${pageId}`);
    if (!quizData) return undefined;
    
    try {
      const data = JSON.parse(quizData);
      return data.score;
    } catch {
      return undefined;
    }
  }

  /**
   * Get quiz answers for a specific page
   */
  static getQuizAnswers(pageId: string): { [key: number]: string | { [key: string]: string } } | undefined {
    const quizData = localStorage.getItem(`sage-quiz-${pageId}`);
    if (!quizData) return undefined;
    
    try {
      const data = JSON.parse(quizData);
      return data.answers;
    } catch {
      return undefined;
    }
  }

  /**
   * Get quiz last completed date
   */
  static getQuizLastCompleted(pageId: string): string | undefined {
    const quizData = localStorage.getItem(`sage-quiz-${pageId}`);
    if (!quizData) return undefined;
    
    try {
      const data = JSON.parse(quizData);
      return data.lastCompleted;
    } catch {
      return undefined;
    }
  }

  /**
   * Check if reflection is completed for a specific page
   */
  static isReflectionCompleted(pageId: string): boolean {
    const reflectionData = localStorage.getItem(`sage-reflection-${pageId}-current`);
    if (!reflectionData) return false;
    
    try {
      const data = JSON.parse(reflectionData);
      // Check reflection fields
      const hasCaseStudy = data.caseStudyReflection?.trim();
      const hasPractice = data.practiceReflection?.trim();
      const hasNextSteps = data.nextSteps?.trim();
      // Hearing Needs page now has two reflection fields
      if (pageId === 'hearing-needs') {
        return !!(hasCaseStudy && hasPractice);
      }
      // Default: require three if nextSteps exists, otherwise consider two sufficient
      if (typeof hasNextSteps === 'undefined') {
        return !!(hasCaseStudy && hasPractice);
      }
      return !!(hasCaseStudy && hasPractice && hasNextSteps);
    } catch {
      return false;
    }
  }

  /**
   * Get reflection last completed date
   */
  static getReflectionLastCompleted(pageId: string): string | undefined {
    const versionsData = localStorage.getItem(`sage-reflection-versions-${pageId}`);
    if (!versionsData) return undefined;
    
    try {
      const versions = JSON.parse(versionsData);
      const currentVersion = versions.find((v: any) => v.id === 'current');
      return currentVersion?.lastModified;
    } catch {
      return undefined;
    }
  }

  /**
   * Case Study note: check completion (non-empty)
   */
  static isCaseStudyCompleted(pageId: string): boolean {
    const data = localStorage.getItem(`sage-cs-${pageId}-current`);
    if (!data) return false;
    try {
      const parsed = JSON.parse(data);
      const text = typeof parsed?.text === 'string' ? parsed.text.trim() : '';
      return text.length > 0;
    } catch {
      return false;
    }
  }

  /**
   * Case Study note: get last completed date
   */
  static getCaseStudyLastCompleted(pageId: string): string | undefined {
    const versionsData = localStorage.getItem(`sage-cs-versions-${pageId}`);
    if (!versionsData) return undefined;
    try {
      const versions = JSON.parse(versionsData);
      const currentVersion = versions.find((v: any) => v.id === 'current');
      return currentVersion?.lastModified;
    } catch {
      return undefined;
    }
  }

  /**
   * Case Study note: save completion data and trigger update
   */
  static saveCaseStudyCompletion(pageId: string): void {
    const versionsData = localStorage.getItem(`sage-cs-versions-${pageId}`);
    let versions = [];
    if (versionsData) {
      try {
        versions = JSON.parse(versionsData);
      } catch {
        versions = [];
      }
    }
    const currentVersionIndex = versions.findIndex((v: any) => v.id === 'current');
    const currentVersion = {
      id: 'current',
      lastModified: new Date().toISOString(),
      completed: this.isCaseStudyCompleted(pageId)
    };
    if (currentVersionIndex >= 0) {
      versions[currentVersionIndex] = currentVersion;
    } else {
      versions.push(currentVersion);
    }
    localStorage.setItem(`sage-cs-versions-${pageId}`, JSON.stringify(versions));
    this.triggerProgressUpdate();
  }

  /**
   * Save reflection completion data
   */
  static saveReflectionCompletion(pageId: string): void {
    const versionsData = localStorage.getItem(`sage-reflection-versions-${pageId}`);
    let versions = [];
    
    if (versionsData) {
      try {
        versions = JSON.parse(versionsData);
      } catch {
        versions = [];
      }
    }
    
    // Update or create current version
    const currentVersionIndex = versions.findIndex((v: any) => v.id === 'current');
    const currentVersion = {
      id: 'current',
      lastModified: new Date().toISOString(),
      completed: this.isReflectionCompleted(pageId)
    };
    
    if (currentVersionIndex >= 0) {
      versions[currentVersionIndex] = currentVersion;
    } else {
      versions.push(currentVersion);
    }
    
    localStorage.setItem(`sage-reflection-versions-${pageId}`, JSON.stringify(versions));
    
    // Trigger progress update event
    this.triggerProgressUpdate();
  }

  /**
   * Save quiz completion data
   */
  static saveQuizCompletion(pageId: string, score: number, answers?: { [key: number]: string | { [key: string]: string } }): void {
    const data = {
      completed: true,
      score,
      answers,
      lastCompleted: new Date().toISOString()
    };
    localStorage.setItem(`sage-quiz-${pageId}`, JSON.stringify(data));
    
    // Trigger progress update event
    this.triggerProgressUpdate();
  }

  /**
   * Reset quiz completion for a page
   */
  static resetQuizCompletion(pageId: string): void {
    localStorage.removeItem(`sage-quiz-${pageId}`);
    
    // Trigger progress update event
    this.triggerProgressUpdate();
  }

  /**
   * Trigger a custom event to notify components of progress updates
   */
  private static triggerProgressUpdate(): void {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('sage-progress-updated'));
    }
  }

  /**
   * Get detailed progress for a specific page
   */
  static getPageProgress(pageId: string): { quiz: boolean; reflection: boolean; quizScore?: number; lastActivity?: string } {
    const quizCompleted = this.isQuizCompleted(pageId);
    const reflectionCompleted = this.isReflectionCompleted(pageId);
    const quizScore = this.getQuizScore(pageId);
    const quizLastCompleted = this.getQuizLastCompleted(pageId);
    const reflectionLastCompleted = this.getReflectionLastCompleted(pageId);
    
    // Get the most recent activity
    let lastActivity: string | undefined;
    if (quizLastCompleted && reflectionLastCompleted) {
      lastActivity = new Date(quizLastCompleted) > new Date(reflectionLastCompleted) 
        ? quizLastCompleted 
        : reflectionLastCompleted;
    } else if (quizLastCompleted) {
      lastActivity = quizLastCompleted;
    } else if (reflectionLastCompleted) {
      lastActivity = reflectionLastCompleted;
    }
    
    return {
      quiz: quizCompleted,
      reflection: reflectionCompleted,
      quizScore,
      lastActivity
    };
  }

  /**
   * Get progress statistics
   */
  static getProgressStats(): {
    totalQuizzes: number;
    completedQuizzes: number;
    totalReflections: number;
    completedReflections: number;
    averageQuizScore: number;
    daysActive: number;
    lastActivityDate?: string;
  } {
    const progress = this.getOverallProgress();
    const quizItems = progress.items.filter(item => item.type === 'quiz');
    const reflectionItems = progress.items.filter(item => item.type === 'reflection');
    
    const completedQuizzes = quizItems.filter(item => item.completed);
    const completedReflections = reflectionItems.filter(item => item.completed);
    
    const averageQuizScore = completedQuizzes.length > 0
      ? Math.round(completedQuizzes.reduce((sum, item) => sum + (item.score || 0), 0) / completedQuizzes.length)
      : 0;
    
    // Calculate days active
    const allDates = progress.items
      .filter(item => item.lastCompleted)
      .map(item => new Date(item.lastCompleted!).toDateString());
    
    const uniqueDates = [...new Set(allDates)];
    const daysActive = uniqueDates.length;
    
    // Get last activity date
    const lastActivityDate = progress.items
      .filter(item => item.lastCompleted)
      .sort((a, b) => new Date(b.lastCompleted!).getTime() - new Date(a.lastCompleted!).getTime())[0]?.lastCompleted;
    
    return {
      totalQuizzes: quizItems.length,
      completedQuizzes: completedQuizzes.length,
      totalReflections: reflectionItems.length,
      completedReflections: completedReflections.length,
      averageQuizScore,
      daysActive,
      lastActivityDate
    };
  }

  /**
   * Get page title from page ID
   */
  private static getPageTitle(pageId: string): string {
    const titles: { [key: string]: string } = {
      'physical-disabilities': 'Visual Needs',
      'hearing-needs': 'Hearing Needs',
      'physical-sensory-needs': 'Physical and Sensory Needs',
      'cognitive-intellectual-needs': 'Cognitive and Intellectual Needs',
      'speech-language-needs': 'Speech and Language Needs',
      'communication': 'Communication',
      'multiple-disabilities': 'Multiple Disabilities',
      'signposting': 'Signposting Tool'
    };
    return titles[pageId] || pageId;
  }

  /**
   * Get achievement level based on completion percentage
   */
  static getAchievementLevel(percentage: number): { level: string; color: string; icon: string; message: string } {
    if (percentage === 100) {
      return {
        level: 'Master',
        color: 'warning',
        icon: 'star',
        message: 'Congratulations! You\'ve completed all quizzes and reflections. You\'re a SAGE Master!'
      };
    } else if (percentage >= 80) {
      return {
        level: 'Advanced',
        color: 'success',
        icon: 'checkmark-circle',
        message: 'Excellent progress! You\'re well on your way to becoming a SAGE expert.'
      };
    } else if (percentage >= 60) {
      return {
        level: 'Intermediate',
        color: 'primary',
        icon: 'school',
        message: 'Good work! Keep going to strengthen your understanding.'
      };
    } else if (percentage >= 40) {
      return {
        level: 'Beginner',
        color: 'secondary',
        icon: 'bulb',
        message: 'You\'re making good progress. Continue exploring the materials.'
      };
    } else {
      return {
        level: 'Getting Started',
        color: 'medium',
        icon: 'play',
        message: 'Welcome to SAGE! Start your learning journey by exploring the disability categories.'
      };
    }
  }

  /**
   * Get recent activity (last 5 completed items)
   */
  static getRecentActivity(): ProgressItem[] {
    const progress = this.getOverallProgress();
    return progress.items
      .filter(item => item.completed && item.lastCompleted)
      .sort((a, b) => new Date(b.lastCompleted!).getTime() - new Date(a.lastCompleted!).getTime())
      .slice(0, 5);
  }

  /**
   * Get completion streak (consecutive days with activity)
   */
  static getCompletionStreak(): number {
    const progress = this.getOverallProgress();
    const completedItems = progress.items.filter(item => item.completed && item.lastCompleted);
    
    if (completedItems.length === 0) return 0;

    const dates = completedItems
      .map(item => new Date(item.lastCompleted!).toDateString())
      .filter((date, index, arr) => arr.indexOf(date) === index) // unique dates
      .sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

    let streak = 0;
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toDateString();

    for (let i = 0; i < dates.length; i++) {
      const expectedDate = i === 0 ? today : 
                          i === 1 ? yesterday :
                          new Date(Date.now() - i * 24 * 60 * 60 * 1000).toDateString();
      
      if (dates[i] === expectedDate) {
        streak++;
      } else {
        break;
      }
    }

    return streak;
  }
} 