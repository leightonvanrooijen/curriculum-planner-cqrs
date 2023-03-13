Feature: Create a Subject

  @acceptance
  Scenario: Subject is created
    When a user creates a Subject
    Then a Subject should be created