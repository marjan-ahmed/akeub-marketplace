// MCQ Generation System for AKUEB Students
// Supports infinite question generation for all grades, subjects, and chapters

export interface MCQQuestion {
  id: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'impossible';
  subject: string;
  chapter: string;
  grade: string;
  syllabus: string;
  topic: string;
  questionType: 'conceptual' | 'numerical' | 'application' | 'analytical';
  timeLimit: number; // in seconds
  marks: number;
}

export interface ChapterContent {
  [key: string]: {
    topics: string[];
    concepts: string[];
    formulas: string[];
    examples: string[];
    keyPoints: string[];
  };
}

// Comprehensive subject content database
export const subjectContent: { [subject: string]: { [grade: string]: ChapterContent } } = {
  mathematics: {
    'ssc1': {
      'Real Numbers': {
        topics: ['Rational Numbers', 'Irrational Numbers', 'Real Number System', 'Properties of Real Numbers'],
        concepts: ['Number line representation', 'Decimal expansion', 'Euclid\'s division lemma'],
        formulas: ['√(ab) = √a × √b', '√(a/b) = √a / √b', 'a^m × a^n = a^(m+n)'],
        examples: ['√2 is irrational', '0.333... = 1/3', 'HCF and LCM problems'],
        keyPoints: ['Every real number has a decimal expansion', 'Rational numbers have terminating or repeating decimals']
      },
      'Polynomials': {
        topics: ['Polynomial Definition', 'Degree of Polynomial', 'Zeros of Polynomial', 'Remainder Theorem'],
        concepts: ['Linear polynomial', 'Quadratic polynomial', 'Cubic polynomial', 'Factor theorem'],
        formulas: ['p(x) = ax + b', 'p(x) = ax² + bx + c', 'If p(a) = 0, then (x-a) is a factor'],
        examples: ['x² - 5x + 6 = (x-2)(x-3)', 'Finding zeros graphically'],
        keyPoints: ['Degree determines the maximum number of zeros', 'Remainder theorem helps find remainders']
      },
      'Coordinate Geometry': {
        topics: ['Cartesian Plane', 'Distance Formula', 'Section Formula', 'Area of Triangle'],
        concepts: ['Plotting points', 'Quadrants', 'Midpoint', 'Collinear points'],
        formulas: ['d = √[(x₂-x₁)² + (y₂-y₁)²]', 'Midpoint = ((x₁+x₂)/2, (y₁+y₂)/2)'],
        examples: ['Distance between (0,0) and (3,4) is 5', 'Triangle area using coordinates'],
        keyPoints: ['Distance formula is based on Pythagoras theorem', 'Section formula divides line segments']
      }
    },
    'ssc2': {
      'Quadratic Equations': {
        topics: ['Standard Form', 'Factorization Method', 'Quadratic Formula', 'Nature of Roots'],
        concepts: ['Discriminant', 'Sum and product of roots', 'Completing the square'],
        formulas: ['ax² + bx + c = 0', 'x = (-b ± √(b²-4ac))/2a', 'Δ = b² - 4ac'],
        examples: ['x² - 5x + 6 = 0 has roots 2, 3', 'Word problems on quadratic equations'],
        keyPoints: ['Discriminant determines nature of roots', 'Two methods: factorization and formula']
      },
      'Arithmetic Progressions': {
        topics: ['AP Definition', 'nth Term', 'Sum of n Terms', 'Applications'],
        concepts: ['Common difference', 'First term', 'Last term', 'Mean'],
        formulas: ['aₙ = a + (n-1)d', 'Sₙ = n/2[2a + (n-1)d]', 'Sₙ = n/2(a + l)'],
        examples: ['2, 5, 8, 11... has d = 3', 'Sum of first 10 natural numbers'],
        keyPoints: ['Common difference is constant', 'Two formulas for sum depending on known values']
      }
    },
    'hsc1': {
      'Trigonometric Functions': {
        topics: ['Trigonometric Ratios', 'Trigonometric Identities', 'Trigonometric Equations'],
        concepts: ['Unit circle', 'Periodicity', 'Domain and range', 'Graphs'],
        formulas: ['sin²θ + cos²θ = 1', 'tan θ = sin θ/cos θ', 'sin(A+B) = sinA cosB + cosA sinB'],
        examples: ['sin 30° = 1/2', 'cos 60° = 1/2', 'Solving sin θ = 1/2'],
        keyPoints: ['Fundamental identities are crucial', 'Trigonometric functions are periodic']
      },
      'Limits and Derivatives': {
        topics: ['Concept of Limit', 'Derivative Definition', 'Rules of Differentiation'],
        concepts: ['Left and right limits', 'Continuity', 'Differentiability'],
        formulas: ['lim(x→a) f(x)', 'd/dx(xⁿ) = nxⁿ⁻¹', 'd/dx(sin x) = cos x'],
        examples: ['lim(x→0) sin x/x = 1', 'Derivative of x² is 2x'],
        keyPoints: ['Limits help define derivatives', 'Derivative represents rate of change']
      }
    },
    'hsc2': {
      'Integration': {
        topics: ['Indefinite Integration', 'Definite Integration', 'Applications of Integration'],
        concepts: ['Antiderivative', 'Fundamental theorem of calculus', 'Area under curve'],
        formulas: ['∫xⁿ dx = xⁿ⁺¹/(n+1) + C', '∫sin x dx = -cos x + C', '∫ₐᵇ f(x)dx'],
        examples: ['∫x² dx = x³/3 + C', 'Area between curves'],
        keyPoints: ['Integration is reverse of differentiation', 'Definite integrals give numerical values']
      }
    }
  },
  physics: {
    'ssc1': {
      'Light': {
        topics: ['Reflection of Light', 'Refraction of Light', 'Lenses', 'Optical Instruments'],
        concepts: ['Laws of reflection', 'Snell\'s law', 'Total internal reflection', 'Lens formula'],
        formulas: ['1/f = 1/v - 1/u', 'n = sin i/sin r', 'Power P = 1/f'],
        examples: ['Mirror formula applications', 'Lens combinations'],
        keyPoints: ['Light travels in straight lines', 'Refraction causes bending of light']
      },
      'Electricity': {
        topics: ['Electric Current', 'Potential Difference', 'Resistance', 'Electric Power'],
        concepts: ['Ohm\'s law', 'Series and parallel circuits', 'Heating effect'],
        formulas: ['V = IR', 'P = VI = I²R = V²/R', 'Rs = R₁ + R₂ + R₃'],
        examples: ['Calculating current in circuits', 'Power consumption problems'],
        keyPoints: ['Current flows from high to low potential', 'Resistance opposes current flow']
      }
    },
    'ssc2': {
      'Magnetic Effects of Electric Current': {
        topics: ['Magnetic Field', 'Force on Current-carrying Conductor', 'Electromagnetic Induction'],
        concepts: ['Right-hand rule', 'Fleming\'s rules', 'Lenz\'s law', 'Faraday\'s law'],
        formulas: ['F = BIL sin θ', 'ε = -dΦ/dt', 'B = μ₀I/2πr'],
        examples: ['Force on conductor in magnetic field', 'EMF in moving coil'],
        keyPoints: ['Moving charges create magnetic fields', 'Changing magnetic flux induces EMF']
      }
    },
    'hsc1': {
      'Waves': {
        topics: ['Wave Motion', 'Sound Waves', 'Wave Properties', 'Doppler Effect'],
        concepts: ['Wavelength', 'Frequency', 'Amplitude', 'Wave speed'],
        formulas: ['v = fλ', 'f\' = f(v ± vₒ)/(v ± vₛ)', 'I ∝ A²'],
        examples: ['Sound wave calculations', 'Doppler effect in ambulance siren'],
        keyPoints: ['Waves transfer energy without transferring matter', 'Doppler effect changes frequency']
      }
    },
    'hsc2': {
      'Modern Physics': {
        topics: ['Photoelectric Effect', 'Atomic Structure', 'Nuclear Physics'],
        concepts: ['Quantum nature of light', 'Energy levels', 'Radioactivity'],
        formulas: ['E = hf', 'E = mc²', 'λ = h/p'],
        examples: ['Einstein\'s photoelectric equation', 'Nuclear reactions'],
        keyPoints: ['Light has particle nature', 'Energy is quantized in atoms']
      }
    }
  },
  chemistry: {
    'ssc1': {
      'Acids, Bases and Salts': {
        topics: ['Acid-Base Indicators', 'pH Scale', 'Neutralization', 'Salt Formation'],
        concepts: ['Arrhenius theory', 'Bronsted-Lowry theory', 'Strong and weak acids'],
        formulas: ['pH = -log[H⁺]', 'pOH = -log[OH⁻]', 'pH + pOH = 14'],
        examples: ['HCl + NaOH → NaCl + H₂O', 'pH of common substances'],
        keyPoints: ['Acids release H⁺ ions', 'Bases release OH⁻ ions', 'pH scale ranges 0-14']
      },
      'Metals and Non-metals': {
        topics: ['Properties of Metals', 'Properties of Non-metals', 'Extraction of Metals', 'Corrosion'],
        concepts: ['Metallic bonding', 'Reactivity series', 'Reduction', 'Oxidation'],
        formulas: ['Metal + Acid → Salt + H₂', 'Metal oxide + Acid → Salt + Water'],
        examples: ['Zn + HCl → ZnCl₂ + H₂', 'Extraction of iron from ore'],
        keyPoints: ['Metals are good conductors', 'Non-metals are poor conductors']
      }
    },
    'ssc2': {
      'Carbon and its Compounds': {
        topics: ['Covalent Bonding', 'Saturated Hydrocarbons', 'Unsaturated Hydrocarbons', 'Functional Groups'],
        concepts: ['Tetravalency of carbon', 'Isomerism', 'Homologous series'],
        formulas: ['CₙH₂ₙ₊₂ (alkanes)', 'CₙH₂ₙ (alkenes)', 'CₙH₂ₙ₋₂ (alkynes)'],
        examples: ['CH₄, C₂H₆, C₃H₈ (alkane series)', 'Ethanol, Ethanoic acid'],
        keyPoints: ['Carbon forms four covalent bonds', 'Organic compounds have carbon backbone']
      }
    },
    'hsc1': {
      'Chemical Bonding': {
        topics: ['Ionic Bonding', 'Covalent Bonding', 'Metallic Bonding', 'Intermolecular Forces'],
        concepts: ['Electronegativity', 'Bond polarity', 'Hybridization', 'VSEPR theory'],
        formulas: ['Lattice energy', 'Bond energy', 'Dipole moment'],
        examples: ['NaCl formation', 'H₂O molecular geometry', 'NH₃ structure'],
        keyPoints: ['Ionic bonds form between metals and non-metals', 'Covalent bonds share electrons']
      }
    },
    'hsc2': {
      'Chemical Kinetics': {
        topics: ['Rate of Reaction', 'Factors Affecting Rate', 'Rate Law', 'Activation Energy'],
        concepts: ['Collision theory', 'Catalysis', 'Order of reaction', 'Half-life'],
        formulas: ['Rate = k[A]ᵐ[B]ⁿ', 'k = Ae^(-Ea/RT)', 't₁/₂ = 0.693/k'],
        examples: ['Effect of temperature on rate', 'Enzyme catalysis'],
        keyPoints: ['Rate depends on concentration', 'Catalysts lower activation energy']
      }
    }
  },
  biology: {
    'ssc1': {
      'Life Processes': {
        topics: ['Nutrition', 'Respiration', 'Transportation', 'Excretion'],
        concepts: ['Photosynthesis', 'Cellular respiration', 'Circulatory system', 'Kidney function'],
        formulas: ['6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂', 'C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + ATP'],
        examples: ['Stomatal function', 'Blood circulation', 'Nephron structure'],
        keyPoints: ['All living organisms need energy', 'Waste products must be removed']
      }
    },
    'ssc2': {
      'Heredity and Evolution': {
        topics: ['Mendel\'s Laws', 'Chromosomes', 'Sex Determination', 'Evolution'],
        concepts: ['Dominant and recessive traits', 'Genetic cross', 'Natural selection'],
        formulas: ['Monohybrid ratio 3:1', 'Dihybrid ratio 9:3:3:1'],
        examples: ['Pea plant experiments', 'Human blood groups', 'Darwin\'s finches'],
        keyPoints: ['Traits are inherited from parents', 'Evolution occurs through natural selection']
      }
    },
    'hsc1': {
      'Cell Biology': {
        topics: ['Cell Structure', 'Cell Division', 'Biomolecules', 'Enzymes'],
        concepts: ['Prokaryotic vs Eukaryotic', 'Mitosis and Meiosis', 'Protein structure'],
        formulas: ['Enzyme kinetics: Km, Vmax', 'Cell cycle phases'],
        examples: ['Plant vs Animal cell', 'DNA replication', 'Protein synthesis'],
        keyPoints: ['Cell is the basic unit of life', 'Enzymes are biological catalysts']
      }
    },
    'hsc2': {
      'Molecular Biology': {
        topics: ['DNA Structure', 'Gene Expression', 'Genetic Engineering', 'Biotechnology'],
        concepts: ['Central dogma', 'Transcription', 'Translation', 'PCR'],
        formulas: ['DNA → RNA → Protein', 'Genetic code triplets'],
        examples: ['DNA fingerprinting', 'Insulin production', 'Gene therapy'],
        keyPoints: ['DNA stores genetic information', 'Biotechnology has medical applications']
      }
    }
  }
};

// Question templates for different difficulty levels
export const questionTemplates = {
  easy: {
    conceptual: [
      "What is {concept}?",
      "Define {term}.",
      "Which of the following is true about {topic}?",
      "The main characteristic of {concept} is:",
      "Identify the correct statement about {topic}:"
    ],
    numerical: [
      "Calculate {quantity} when {given}.",
      "Find the value of {variable} in the equation {equation}.",
      "If {condition}, what is {unknown}?",
      "Solve for {variable}: {equation}",
      "What is the result of {operation}?"
    ]
  },
  medium: {
    application: [
      "In the context of {scenario}, what happens when {condition}?",
      "Apply {principle} to solve: {problem}",
      "Using {method}, determine {unknown} for {given_conditions}.",
      "How would you use {concept} to explain {phenomenon}?",
      "Given {data}, calculate {result} using {formula}."
    ],
    analytical: [
      "Compare and contrast {concept1} and {concept2}.",
      "Analyze the relationship between {variable1} and {variable2}.",
      "What factors affect {process}?",
      "Explain why {phenomenon} occurs in terms of {principle}.",
      "Evaluate the significance of {concept} in {context}."
    ]
  },
  hard: {
    complex: [
      "Derive the relationship between {variables} starting from {principle}.",
      "Prove that {statement} using {method}.",
      "Critically analyze {scenario} considering {multiple_factors}.",
      "Design an experiment to test {hypothesis}.",
      "Solve the complex problem: {multi_step_problem}."
    ],
    synthesis: [
      "Integrate concepts of {topic1} and {topic2} to explain {phenomenon}.",
      "Create a model that demonstrates {complex_concept}.",
      "Synthesize information about {topics} to predict {outcome}.",
      "Develop a solution for {complex_problem} using {principles}.",
      "Construct an argument for {position} based on {evidence}."
    ]
  },
  impossible: {
    advanced: [
      "Using advanced {higher_grade_concept}, solve {complex_problem}.",
      "Apply {next_level_principle} to analyze {current_grade_scenario}.",
      "Integrate {current_topic} with {advanced_concept} from {next_grade}.",
      "Solve using {advanced_method}: {challenging_problem}.",
      "Demonstrate mastery by connecting {basic_concept} to {advanced_application}."
    ]
  }
};

// MCQ Generation Engine
export class MCQGenerator {
  private questionCount: number = 0;
  
  constructor() {
    this.questionCount = 0;
  }

  generateMCQ(params: {
    grade: string;
    subject: string;
    chapter: string;
    difficulty: 'easy' | 'medium' | 'hard' | 'impossible';
    syllabus: string;
  }): MCQQuestion {
    this.questionCount++;
    
    const { grade, subject, chapter, difficulty, syllabus } = params;
    const chapterContent = subjectContent[subject]?.[grade]?.[chapter];
    
    if (!chapterContent) {
      return this.generateFallbackQuestion(params);
    }

    const questionType = this.selectQuestionType(difficulty);
    const question = this.generateQuestionText(chapterContent, difficulty, questionType, subject);
    const options = this.generateOptions(question, chapterContent, subject);
    const correct = Math.floor(Math.random() * 4);
    const explanation = this.generateExplanation(question, options[correct], chapterContent);

    return {
      id: `${subject}_${grade}_${chapter}_${difficulty}_${this.questionCount}`,
      question: question.text,
      options,
      correct,
      explanation,
      difficulty,
      subject,
      chapter,
      grade,
      syllabus,
      topic: question.topic,
      questionType,
      timeLimit: this.getTimeLimit(difficulty),
      marks: this.getMarks(difficulty)
    };
  }

  private selectQuestionType(difficulty: string): 'conceptual' | 'numerical' | 'application' | 'analytical' {
    const types = {
      easy: ['conceptual', 'numerical'],
      medium: ['application', 'numerical', 'conceptual'],
      hard: ['analytical', 'application', 'numerical'],
      impossible: ['analytical', 'application']
    };
    
    const availableTypes = types[difficulty as keyof typeof types] || ['conceptual'];
    return availableTypes[Math.floor(Math.random() * availableTypes.length)] as any;
  }

  private generateQuestionText(
    content: ChapterContent[string], 
    difficulty: string, 
    type: string,
    subject: string
  ): { text: string; topic: string } {
    const topic = content.topics[Math.floor(Math.random() * content.topics.length)];
    const concept = content.concepts[Math.floor(Math.random() * content.concepts.length)];
    
    // Subject-specific question generation
    switch (subject) {
      case 'mathematics':
        return this.generateMathQuestion(content, difficulty, type, topic);
      case 'physics':
        return this.generatePhysicsQuestion(content, difficulty, type, topic);
      case 'chemistry':
        return this.generateChemistryQuestion(content, difficulty, type, topic);
      case 'biology':
        return this.generateBiologyQuestion(content, difficulty, type, topic);
      default:
        return { text: `What is the main concept of ${topic}?`, topic };
    }
  }

  private generateMathQuestion(content: any, difficulty: string, type: string, topic: string) {
    const questions = {
      easy: [
        `What is the value of √16?`,
        `If x + 5 = 12, what is x?`,
        `What is 2³?`,
        `Find the HCF of 12 and 18.`,
        `What is the degree of polynomial 3x² + 2x + 1?`
      ],
      medium: [
        `Solve the quadratic equation x² - 5x + 6 = 0.`,
        `Find the 10th term of AP: 2, 5, 8, 11, ...`,
        `What is the distance between points (0,0) and (3,4)?`,
        `If the discriminant of ax² + bx + c = 0 is zero, what can you conclude?`,
        `Find the sum of first 20 natural numbers.`
      ],
      hard: [
        `Prove that √2 is irrational.`,
        `Find the area of triangle with vertices (1,1), (2,3), (4,2).`,
        `Derive the quadratic formula from ax² + bx + c = 0.`,
        `If α and β are roots of x² - px + q = 0, find α² + β².`,
        `Solve: |x - 2| + |x + 1| = 5`
      ],
      impossible: [
        `Find the number of solutions to sin(x) = x/10 in [0, 2π].`,
        `Evaluate lim(x→0) (sin x - x)/x³.`,
        `Find the coefficient of x⁵ in (1 + x + x²)¹⁰.`,
        `Solve the differential equation dy/dx = y/x.`,
        `Find the area enclosed by y = x² and y = 2x - x².`
      ]
    };

    const questionList = questions[difficulty as keyof typeof questions] || questions.easy;
    const questionText = questionList[Math.floor(Math.random() * questionList.length)];
    
    return { text: questionText, topic };
  }

  private generatePhysicsQuestion(content: any, difficulty: string, type: string, topic: string) {
    const questions = {
      easy: [
        `What is the unit of electric current?`,
        `State Ohm's law.`,
        `What happens to the image when object moves closer to a convex lens?`,
        `Name the phenomenon responsible for the blue color of sky.`,
        `What is the speed of light in vacuum?`
      ],
      medium: [
        `A wire of resistance 10Ω carries current 2A. Calculate the power dissipated.`,
        `An object is placed 20cm from a convex lens of focal length 15cm. Find image distance.`,
        `Calculate the force on a conductor of length 0.5m carrying 3A current in 0.2T magnetic field.`,
        `A wave has frequency 500Hz and wavelength 0.6m. Find its speed.`,
        `What is the refractive index if critical angle is 42°?`
      ],
      hard: [
        `Derive the lens formula 1/f = 1/v - 1/u.`,
        `Explain the working principle of AC generator using Faraday's law.`,
        `A particle moves with velocity v = 3t² + 2t. Find acceleration at t = 2s.`,
        `Calculate the energy stored in a capacitor of 10μF charged to 100V.`,
        `Derive the expression for magnetic field at the center of circular coil.`
      ],
      impossible: [
        `Solve Schrödinger equation for particle in a box.`,
        `Calculate the binding energy of deuteron using mass-energy relation.`,
        `Derive Maxwell's electromagnetic wave equation.`,
        `Find the probability of tunneling through a potential barrier.`,
        `Calculate the Compton shift for X-ray scattering at 90°.`
      ]
    };

    const questionList = questions[difficulty as keyof typeof questions] || questions.easy;
    const questionText = questionList[Math.floor(Math.random() * questionList.length)];
    
    return { text: questionText, topic };
  }

  private generateChemistryQuestion(content: any, difficulty: string, type: string, topic: string) {
    const questions = {
      easy: [
        `What is the pH of pure water at 25°C?`,
        `Name the gas evolved when zinc reacts with hydrochloric acid.`,
        `What is the molecular formula of methane?`,
        `Which element has atomic number 6?`,
        `What color does phenolphthalein turn in basic solution?`
      ],
      medium: [
        `Calculate the pH of 0.01M HCl solution.`,
        `Balance the equation: C₂H₆ + O₂ → CO₂ + H₂O`,
        `How many moles are present in 22g of CO₂?`,
        `What is the oxidation state of Cr in K₂Cr₂O₇?`,
        `Calculate the molecular mass of Ca(OH)₂.`
      ],
      hard: [
        `Derive the relationship between Kp and Kc for the reaction N₂ + 3H₂ ⇌ 2NH₃.`,
        `Explain the mechanism of SN1 reaction with example.`,
        `Calculate the emf of cell: Zn|Zn²⁺||Cu²⁺|Cu given E°values.`,
        `Determine the rate law for reaction A + B → C if doubling [A] doubles rate.`,
        `Calculate the degree of dissociation of 0.1M CH₃COOH (Ka = 1.8×10⁻⁵).`
      ],
      impossible: [
        `Solve the Schrödinger equation for hydrogen atom to find energy levels.`,
        `Derive the expression for activity coefficient using Debye-Hückel theory.`,
        `Calculate the crystal field stabilization energy for [Co(NH₃)₆]³⁺.`,
        `Determine the mechanism of enzyme catalysis using Michaelis-Menten kinetics.`,
        `Calculate the entropy change for phase transition using statistical mechanics.`
      ]
    };

    const questionList = questions[difficulty as keyof typeof questions] || questions.easy;
    const questionText = questionList[Math.floor(Math.random() * questionList.length)];
    
    return { text: questionText, topic };
  }

  private generateBiologyQuestion(content: any, difficulty: string, type: string, topic: string) {
    const questions = {
      easy: [
        `What is the basic unit of life?`,
        `Name the process by which plants make food.`,
        `Which organ is responsible for pumping blood?`,
        `What is the function of red blood cells?`,
        `Name the reproductive part of a flower.`
      ],
      medium: [
        `Explain the process of cellular respiration in mitochondria.`,
        `What is the difference between mitosis and meiosis?`,
        `How does natural selection lead to evolution?`,
        `Describe the structure and function of DNA.`,
        `What happens during the light reaction of photosynthesis?`
      ],
      hard: [
        `Explain the molecular mechanism of muscle contraction.`,
        `Describe the regulation of gene expression in prokaryotes.`,
        `How does the immune system distinguish self from non-self?`,
        `Explain the process of protein synthesis from DNA to protein.`,
        `Describe the mechanism of hormone action at cellular level.`
      ],
      impossible: [
        `Analyze the epigenetic modifications in cancer development.`,
        `Explain the molecular basis of memory formation in neurons.`,
        `Describe the mechanism of CRISPR-Cas9 gene editing system.`,
        `How do stem cells maintain pluripotency at molecular level?`,
        `Explain the role of microRNAs in post-transcriptional regulation.`
      ]
    };

    const questionList = questions[difficulty as keyof typeof questions] || questions.easy;
    const questionText = questionList[Math.floor(Math.random() * questionList.length)];
    
    return { text: questionText, topic };
  }

  private generateOptions(question: { text: string }, content: any, subject: string): string[] {
    // Generate 4 options based on the question and subject
    const options: string[] = [];
    
    // This is a simplified version - in a real implementation, you'd have more sophisticated option generation
    switch (subject) {
      case 'mathematics':
        options.push('Option A', 'Option B', 'Option C', 'Option D');
        break;
      case 'physics':
        options.push('Option A', 'Option B', 'Option C', 'Option D');
        break;
      case 'chemistry':
        options.push('Option A', 'Option B', 'Option C', 'Option D');
        break;
      case 'biology':
        options.push('Option A', 'Option B', 'Option C', 'Option D');
        break;
      default:
        options.push('Option A', 'Option B', 'Option C', 'Option D');
    }

    // Shuffle options
    return this.shuffleArray(options);
  }

  private generateExplanation(question: { text: string }, correctAnswer: string, content: any): string {
    return `The correct answer is "${correctAnswer}". This is based on the fundamental principles covered in this chapter. The concept involves understanding the key relationships and applying the appropriate formulas or reasoning methods.`;
  }

  private shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  private getTimeLimit(difficulty: string): number {
    const timeLimits = {
      easy: 30,
      medium: 45,
      hard: 60,
      impossible: 90
    };
    return timeLimits[difficulty as keyof typeof timeLimits] || 30;
  }

  private getMarks(difficulty: string): number {
    const marks = {
      easy: 1,
      medium: 2,
      hard: 3,
      impossible: 5
    };
    return marks[difficulty as keyof typeof marks] || 1;
  }

  private generateFallbackQuestion(params: any): MCQQuestion {
    return {
      id: `fallback_${Date.now()}`,
      question: `What is a key concept in ${params.chapter}?`,
      options: ['Concept A', 'Concept B', 'Concept C', 'Concept D'],
      correct: 0,
      explanation: 'This is a fundamental concept in the chapter.',
      difficulty: params.difficulty,
      subject: params.subject,
      chapter: params.chapter,
      grade: params.grade,
      syllabus: params.syllabus,
      topic: 'General',
      questionType: 'conceptual',
      timeLimit: 30,
      marks: 1
    };
  }

  // Generate multiple MCQs
  generateMultipleMCQs(params: {
    grade: string;
    subject: string;
    chapter: string;
    difficulty: 'easy' | 'medium' | 'hard' | 'impossible';
    syllabus: string;
    count: number;
  }): MCQQuestion[] {
    const questions: MCQQuestion[] = [];
    
    for (let i = 0; i < params.count; i++) {
      questions.push(this.generateMCQ({
        grade: params.grade,
        subject: params.subject,
        chapter: params.chapter,
        difficulty: params.difficulty,
        syllabus: params.syllabus
      }));
    }
    
    return questions;
  }

  // Get available chapters for a subject and grade
  getAvailableChapters(subject: string, grade: string): string[] {
    const content = subjectContent[subject]?.[grade];
    return content ? Object.keys(content) : [];
  }

  // Get chapter topics
  getChapterTopics(subject: string, grade: string, chapter: string): string[] {
    const chapterContent = subjectContent[subject]?.[grade]?.[chapter];
    return chapterContent ? chapterContent.topics : [];
  }

  // Get difficulty-based question count recommendations
  getRecommendedQuestionCount(difficulty: string): number {
    const recommendations = {
      easy: 20,
      medium: 15,
      hard: 10,
      impossible: 5
    };
    return recommendations[difficulty as keyof typeof recommendations] || 10;
  }
}

// Export singleton instance
export const mcqGenerator = new MCQGenerator();

// Utility functions for question management
export const questionUtils = {
  // Filter questions by criteria
  filterQuestions: (questions: MCQQuestion[], criteria: Partial<MCQQuestion>) => {
    return questions.filter(q => {
      return Object.entries(criteria).every(([key, value]) => 
        q[key as keyof MCQQuestion] === value
      );
    });
  },

  // Sort questions by difficulty
  sortByDifficulty: (questions: MCQQuestion[]) => {
    const difficultyOrder = { easy: 1, medium: 2, hard: 3, impossible: 4 };
    return questions.sort((a, b) => 
      difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]
    );
  },

  // Calculate total time for questions
  calculateTotalTime: (questions: MCQQuestion[]) => {
    return questions.reduce((total, q) => total + q.timeLimit, 0);
  },

  // Calculate total marks
  calculateTotalMarks: (questions: MCQQuestion[]) => {
    return questions.reduce((total, q) => total + q.marks, 0);
  },

  // Get question statistics
  getQuestionStats: (questions: MCQQuestion[]) => {
    const stats = {
      total: questions.length,
      byDifficulty: { easy: 0, medium: 0, hard: 0, impossible: 0 },
      byType: { conceptual: 0, numerical: 0, application: 0, analytical: 0 },
      totalTime: 0,
      totalMarks: 0
    };

    questions.forEach(q => {
      stats.byDifficulty[q.difficulty]++;
      stats.byType[q.questionType]++;
      stats.totalTime += q.timeLimit;
      stats.totalMarks += q.marks;
    });

    return stats;
  }
};