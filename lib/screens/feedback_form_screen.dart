import 'package:flutter/material.dart';

class FeedbackFormScreen extends StatefulWidget {
  const FeedbackFormScreen({Key? key}) : super(key: key);

  @override
  State<FeedbackFormScreen> createState() => _FeedbackFormScreenState();
}

class _FeedbackFormScreenState extends State<FeedbackFormScreen> {
  final _formKey = GlobalKey<FormState>();

  final _nameController = TextEditingController();
  final _emailController = TextEditingController();
  final _messageController = TextEditingController();

  double _rating = 4.0; // Default slider rating (1 to 5)
  String _category = 'General';

  final RegExp _emailRegex = RegExp(r'^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$');

  @override
  void dispose() {
    _nameController.dispose();
    _emailController.dispose();
    _messageController.dispose();
    super.dispose();
  }

  void _submitFeedback() {
    if (_formKey.currentState!.validate()) {
      final name = _nameController.text.trim();
      final email = _emailController.text.trim();
      final message = _messageController.text.trim();

      // Print data to console simulating API POST
      debugPrint('=============================================');
      debugPrint('FEEDBACK POST SIMULATION STATUS: SUCCESS (201)');
      debugPrint('Name: $name');
      debugPrint('Email: $email');
      debugPrint('Rating: ${_rating.toInt()} Stars');
      debugPrint('Category: $_category');
      debugPrint('Feedback Message: $message');
      debugPrint('=============================================');

      // Show dialog with summary
      showDialog(
        context: context,
        builder: (context) {
          return AlertDialog(
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
            title: Row(
              children: const [
                Icon(Icons.check_circle_outline, color: Colors.green, size: 28),
                SizedBox(width: 10),
                Text('Feedback Submitted'),
              ],
            ),
            content: SingleChildScrollView(
              child: ListBody(
                children: [
                  const Text(
                    'Thank you for your valuable feedback! Here is a summary of your submission:',
                    style: TextStyle(fontSize: 13, color: Colors.black54),
                  ),
                  const SizedBox(height: 16),
                  _summaryRow('Name', name),
                  _summaryRow('Email', email),
                  _summaryRow('Category', _category),
                  _summaryRow('Rating', '${_rating.toInt()} / 5 Stars'),
                  _summaryRow('Message', message),
                ],
              ),
            ),
            actions: [
              TextButton(
                onPressed: () {
                  Navigator.pop(context); // Close dialog

                  // Reset form
                  _formKey.currentState!.reset();
                  _nameController.clear();
                  _emailController.clear();
                  _messageController.clear();
                  setState(() {
                    _rating = 4.0;
                    _category = 'General';
                  });

                  // Go back to previous screen
                  Navigator.pop(context);
                },
                child: const Text('Great, Thanks!'),
              ),
            ],
          );
        },
      );
    }
  }

  Widget _summaryRow(String label, String value) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 4.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            label.toUpperCase(),
            style: const TextStyle(
              fontSize: 10,
              fontWeight: FontWeight.bold,
              color: Colors.grey,
            ),
          ),
          const SizedBox(height: 2),
          Text(
            value,
            style: const TextStyle(
              fontSize: 13,
              fontWeight: FontWeight.w600,
            ),
          ),
          const Divider(height: 8),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('App Feedback'),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(20.0),
        child: Form(
          key: _formKey,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Text(
                'Help Us Improve',
                style: TextStyle(
                  fontSize: 22,
                  fontWeight: FontWeight.bold,
                  letterSpacing: -0.5,
                ),
              ),
              const SizedBox(height: 6),
              Text(
                'We carefully review bug reports, suggestions, and general experiences directly.',
                style: TextStyle(fontSize: 13, color: Colors.grey[600]),
              ),
              const SizedBox(height: 24),

              // Name field
              TextFormField(
                controller: _nameController,
                decoration: const InputDecoration(
                  labelText: 'Name',
                  prefixIcon: Icon(Icons.person_outline),
                  border: OutlineInputBorder(),
                ),
                validator: (value) {
                  if (value == null || value.trim().isEmpty) {
                    return 'Please enter your name';
                  }
                  return null;
                },
              ),
              const SizedBox(height: 20),

              // Email field
              TextFormField(
                controller: _emailController,
                keyboardType: TextInputType.emailAddress,
                decoration: const InputDecoration(
                  labelText: 'Email Address',
                  prefixIcon: Icon(Icons.email_outlined),
                  border: OutlineInputBorder(),
                ),
                validator: (value) {
                  if (value == null || value.trim().isEmpty) {
                    return 'Please enter your email address';
                  }
                  if (!value.contains('@') || !_emailRegex.hasMatch(value.trim())) {
                    return 'Please enter a valid email address';
                  }
                  return null;
                },
              ),
              const SizedBox(height: 20),

              // Category selector dropdown
              DropdownButtonFormField<String>(
                value: _category,
                decoration: const InputDecoration(
                  labelText: 'Feedback Category',
                  prefixIcon: Icon(Icons.category_outlined),
                  border: OutlineInputBorder(),
                ),
                items: const [
                  DropdownMenuItem(value: 'General', child: Text('General')),
                  DropdownMenuItem(value: 'Bug Report', child: Text('Bug Report')),
                  DropdownMenuItem(value: 'Suggestion', child: Text('Suggestion')),
                ],
                onChanged: (value) {
                  if (value != null) {
                    setState(() {
                      _category = value;
                    });
                  }
                },
              ),
              const SizedBox(height: 24),

              // Rating slider (1-5)
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.between,
                    children: [
                      const Text(
                        'Your Experience Rating:',
                        style: TextStyle(fontSize: 14, fontWeight: FontWeight.bold),
                      ),
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                        decoration: BoxDecoration(
                          color: Theme.of(context).colorScheme.primary.withOpacity(0.1),
                          borderRadius: BorderRadius.circular(10),
                        ),
                        child: Text(
                          '${_rating.toInt()} / 5 Stars',
                          style: TextStyle(
                            fontSize: 13,
                            fontWeight: FontWeight.bold,
                            color: Theme.of(context).colorScheme.primary,
                          ),
                        ),
                      ),
                    ],
                  ),
                  Slider(
                    value: _rating,
                    min: 1.0,
                    max: 5.0,
                    divisions: 4,
                    label: '${_rating.toInt()} Stars',
                    onChanged: (double val) {
                      setState(() {
                        _rating = val;
                      });
                    },
                  ),
                ],
              ),
              const SizedBox(height: 20),

              // Feedback Message multiline field
              TextFormField(
                controller: _messageController,
                maxLines: 4,
                decoration: const InputDecoration(
                  labelText: 'Feedback Message',
                  alignLabelWithHint: true,
                  prefixIcon: Padding(
                    padding: EdgeInsets.only(bottom: 56.0),
                    child: Icon(Icons.chat_bubble_outline),
                  ),
                  border: OutlineInputBorder(),
                  helperText: 'Minimum 20 characters',
                ),
                validator: (value) {
                  if (value == null || value.trim().isEmpty) {
                    return 'Please write your feedback details';
                  }
                  if (value.trim().length < 20) {
                    return 'Feedback details must be at least 20 characters long';
                  }
                  return null;
                },
              ),
              const SizedBox(height: 30),

              // Submit Feedback Action button
              ElevatedButton(
                onPressed: _submitFeedback,
                style: ElevatedButton.styleFrom(
                  minimumSize: const Size.fromHeight(56),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(16),
                  ),
                ),
                child: const Text(
                  'Submit Feedback Report',
                  style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
